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
            document.getElementById('filter-tags-allowlist').value = lists.tagsAllowlist;
            document.getElementById('filter-tags-blocklist').value = lists.tagsBlocklist;
            document.getElementById('filter-urls-allowlist').value = lists.urlsAllowlist;
            document.getElementById('filter-urls-blocklist').value = lists.urlsBlocklist;

            populateFilterModePage();
        }

        const splashToggle = document.getElementById('splash-toggle');
        if (splashToggle) splashToggle.checked = settings.splashEnabled;
    } catch (e) {
        console.warn('Could not load settings', e);
    }
}