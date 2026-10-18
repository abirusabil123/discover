/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

const API_BASE_URL = 'https://backenddiscover.duckdns.org:8443';

// Aborts any in-flight request the moment the page starts unloading.
const pageAbort = new AbortController();
window.addEventListener('pagehide', () => pageAbort.abort(), { once: true });
window.addEventListener('beforeunload', () => pageAbort.abort(), { once: true });

async function apiCall(
    path,
    { method = 'GET', params = null, body = null, signal = pageAbort.signal } = {}
) {
    let url = API_BASE_URL + path;
    if (params) {
        const qs = new URLSearchParams(params).toString();
        if (qs) url += '?' + qs;
    }

    const init = { method, signal };
    if (body !== null) {
        init.headers = { 'Content-Type': 'application/json' };
        init.body = JSON.stringify(body);
    }

    let res;
    try {
        res = await fetch(url, init);
    } catch (err) {
        err.message = `${method} ${path} failed: ${err.message}`;
        throw err;
    }
    if (!res.ok) {
        const e = new Error(`${method} ${path} -> HTTP ${res.status}`);
        e.status = res.status;
        try { e.body = await res.json(); } catch { /* body wasn't JSON */ }
        throw e;
    }
    return res.json();
}

async function logFrontendError(message, level = 'error', stack = null) {
    if (pageAbort.signal.aborted) return;
    try {
        await apiCall('/log-error', {
            method: 'POST',
            body: {
                source: 'frontend',
                level: level,
                message: message + (stack || (new Error().stack)),
                user_agent: navigator.userAgent
            }
        });
        console.error('Successfully logged frontend error:', message);
    } catch (error) {
        console.error('Failed to log frontend error:', message);
    }
}

async function updateLinks(logUser) {
    const { tagsAllowlist, tagsBlocklist, urlsAllowlist, urlsBlocklist } = getFilterList();
    console.log('Applying tags filter:', tagsAllowlist, tagsBlocklist, '\nApplying urls filter:', urlsAllowlist, urlsBlocklist);

    const apiStatus = document.getElementById('api-status-indicator');
    let linkCount = 0;
    const websitePlatform = navigator.platform + ' discover-website';

    try {
        apiLinks = await apiCall('/getLinks', {
            params: {
                platform: websitePlatform,
                logUser: logUser ? 1 : 0,
                tagsAllowlist: tagsAllowlist.join(','),
                tagsBlocklist: tagsBlocklist.join(','),
                urlsAllowlist: urlsAllowlist.join(' '),
                urlsBlocklist: urlsBlocklist.join(' ')
            }
        });
        console.log(`Loaded ${apiLinks.length} apiLinks from API.`);
        linkCount = apiLinks.length;

        apiAllLinks = await apiCall('/getLinks', {
            params: { platform: websitePlatform, logUser: 0 }
        });
        console.log(`Loaded ${apiAllLinks.length} apiAllLinks from API.`);

        // ── success path only ─────────────────────────────
        links = apiLinks;
        allLinks = apiAllLinks;
        if (apiStatus) apiStatus.classList.add('online');

        const successBox = document.getElementById('filter-success');
        if (successBox) {
            const hasFilters = tagsAllowlist.length || tagsBlocklist.length ||
                urlsAllowlist.length || urlsBlocklist.length;
            successBox.textContent = hasFilters
                ? `✅ Filter applied: ${linkCount} link${linkCount !== 1 ? 's' : ''} found`
                : `✅ Showing all ${linkCount} link${linkCount !== 1 ? 's' : ''}`;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Link load aborted due to navigation');
            return;                                    // finally would still run, but there's no finally now
        }
        console.error('Failed to load links from API:', error);
        showErrorMessage("Failed to load links from API.<br>Cannot reach backend server: " + error + "<br>Using static list as fallback.");
        if (apiStatus) apiStatus.classList.add('offline');
    }
}
