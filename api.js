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

function filterAllLinks(filters) {
    console.log(
        'Applying tags filter:', filters.tagsAllowlist, filters.tagsBlocklist,
        '\nApplying urls filter:', filters.urlsAllowlist, filters.urlsBlocklist
    );

    return allLinks.filter(link => {
        // Allowlist: must contain at least one allowed tag
        if (filters.tagsAllowlist.length > 0 &&
            !filters.tagsAllowlist.some(t => link.tags.includes(t))) {
            return false;
        }
        // Blocklist: must not contain any blocked tag
        if (filters.tagsBlocklist.length > 0 &&
            filters.tagsBlocklist.some(t => link.tags.includes(t))) {
            return false;
        }
        // Blocklist: URL must not be blocked
        if (filters.urlsBlocklist.length > 0 &&
            filters.urlsBlocklist.includes(link.url)) {
            return false;
        }
        // Allowlist: URL must be in the allow list (when one is set)
        if (filters.urlsAllowlist.length > 0 &&
            !filters.urlsAllowlist.includes(link.url)) {
            return false;
        }

        if (link?.reviewStatus === 0) {
            return false;
        }
        if (needToIgnore(link.likesDesktop, link.dislikesDesktop)) {
            return false;
        }

        return true;
    });
}


// Filtering criteria
function needToIgnore(likes, dislikes) {
    const total = likes + dislikes;
    // If less votes, consider it okay
    if (total <= 3) {
        return false;
    }
    const undesirable_score = dislikes / Math.max(total, 1);

    return undesirable_score > 0.8;
}

async function updateLinks(logUser) {
    if (logUser) {
        const apiStatus = document.getElementById('api-status-indicator');
        try {
            apiAllLinks = await apiCall('/getLinks', {
                params: { platform: 'desktop', logUser: logUser ? 1 : 0 }
            });
            console.log(`Loaded ${apiAllLinks.length} apiAllLinks from API.`);
            if (apiStatus) {
                apiStatus.classList.add('online');
            }
            allLinks = apiAllLinks;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Link load aborted due to navigation');
                return;
            }
            console.error('Failed to load links from API:', error);
            if (apiStatus) {
                apiStatus.classList.add('offline');
            }
        }
    }


    const filters = getFilterList();
    apiLinks = filterAllLinks(filters);
    links = apiLinks;
    console.log(`Filtered ${links.length} from ${allLinks.length}.`);

    const successBox = document.getElementById('filter-success');
    if (successBox) {
        const hasFilters = filters.tagsAllowlist.length ||
            filters.tagsBlocklist.length ||
            filters.urlsAllowlist.length ||
            filters.urlsBlocklist.length;
        linkCount = apiLinks.length;
        successBox.textContent = hasFilters
            ? `✅ Filter applied: ${linkCount} link${linkCount !== 1 ? 's' : ''} found`
            : `✅ Showing all ${linkCount} link${linkCount !== 1 ? 's' : ''}`;
    }
}
