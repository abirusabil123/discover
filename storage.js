/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

const DEFAULT_SETTINGS = {
    filterMode: 'lists',
    lists: {
        tagsAllowlist: '#daily #daily-desktop',
        tagsBlocklist: '#daily-mobile #optional',
        urlsAllowlist: '',
        urlsBlocklist: ''
    },
    individual: {
        blockedUrls: []
    },
    splashEnabled: false,
};

function getStoredSettings() {
    try {
        const saved = localStorage.getItem('discover-settings');
        if (!saved) {
            console.log("No persisted settings found.");
            return { ...DEFAULT_SETTINGS };
        }
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
        return { ...DEFAULT_SETTINGS };
    }
}

function saveSettings() {
    try {
        const mode = document.querySelector('input[name="filter-mode"]:checked').value;
        localStorage.setItem('discover-settings', JSON.stringify({
            filterMode: mode,
            lists: {
                tagsAllowlist: document.getElementById('filter-tags-allowlist').value,
                tagsBlocklist: document.getElementById('filter-tags-blocklist').value,
                urlsAllowlist: document.getElementById('filter-urls-allowlist').value,
                urlsBlocklist: document.getElementById('filter-urls-blocklist').value,
            },
            individual: {
                blockedUrls: individualBlockedUrls
            },
            splashEnabled: document.getElementById('splash-toggle').checked,
        }));
    } catch (e) {
        console.warn('Could not save settings', e);
    }
}

function applySettings() {
    console.log('applySettings start.');
    try {
        const settings = getStoredSettings();
        const mode = settings.filterMode;
        const lists = settings.lists;
        individualBlockedUrls = settings.individual.blockedUrls;

        // set radio
        const modeRadio = document.querySelector(`input[name="filter-mode"][value="${mode}"]`);
        if (modeRadio) {
            modeRadio.checked = true;
        }

        const filterTagsAllowlist = document.getElementById('filter-tags-allowlist')
        const filterTagsBlocklist = document.getElementById('filter-tags-blocklist')
        const filterUrlsAllowlist = document.getElementById('filter-urls-allowlist')
        const filterUrlsBlocklist = document.getElementById('filter-urls-blocklist')
        if (filterTagsAllowlist && filterTagsBlocklist && filterUrlsAllowlist && filterUrlsBlocklist) {
            filterTagsAllowlist.value = lists.tagsAllowlist;
            filterTagsBlocklist.value = lists.tagsBlocklist;
            filterUrlsAllowlist.value = lists.urlsAllowlist;
            filterUrlsBlocklist.value = lists.urlsBlocklist;

            populateFilterModePage();
        }

        const splashToggle = document.getElementById('splash-toggle');
        if (splashToggle) splashToggle.checked = settings.splashEnabled;
    } catch (e) {
        console.warn('Could not load settings', e);
    }
}