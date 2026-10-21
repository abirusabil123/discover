/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

let individualBlockedUrls = [];

function parseTags(str) {
    return str.split(/[\s,]+/).map(t => t.trim()).filter(Boolean);
}

function getFilterList() {
    const tagsInputAllowlist = document.getElementById('filter-tags-allowlist');
    const tagsInputBlocklist = document.getElementById('filter-tags-blocklist');
    const urlsInputAllowlist = document.getElementById('filter-urls-allowlist');
    const urlsInputBlocklist = document.getElementById('filter-urls-blocklist');

    if (tagsInputAllowlist) {
        const mode = document.querySelector('input[name="filter-mode"]:checked')?.value || 'lists';
        if (mode === 'individual') {
            return {
                tagsAllowlist: [],
                tagsBlocklist: [],
                urlsAllowlist: [],
                urlsBlocklist: individualBlockedUrls
            };
        }

        // list mode
        return {
            tagsAllowlist: parseTags(tagsInputAllowlist.value),
            tagsBlocklist: parseTags(tagsInputBlocklist.value),
            urlsAllowlist: urlsInputAllowlist.value.split(' ').map(t => t.trim()).filter(Boolean),
            urlsBlocklist: urlsInputBlocklist.value.split(' ').map(t => t.trim()).filter(Boolean)
        };
    } else {
        console.log("At getFilterList else.");
        const settings = getStoredSettings();
        if (settings.filterMode === 'individual') {
            return {
                tagsAllowlist: [],
                tagsBlocklist: [],
                urlsAllowlist: [],
                urlsBlocklist: settings.individual.blockedUrls || []
            };
        }

        // list mode
        const lists = settings.lists;
        return {
            tagsAllowlist: parseTags(lists.tagsAllowlist),
            tagsBlocklist: parseTags(lists.tagsBlocklist),
            urlsAllowlist: lists.urlsAllowlist.split(' ').map(t => t.trim()).filter(Boolean),
            urlsBlocklist: lists.urlsBlocklist.split(' ').map(t => t.trim()).filter(Boolean)
        };
    }
}

async function loadIndividualFilter() {
    const container = document.getElementById('individual-link-list');
    if (!container) return;

    try {
        allLinks.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        const blockedSet = new Set(individualBlockedUrls);
        container.innerHTML = '';

        // Count line
        const count = document.createElement('p');
        count.className = 'individual-count';
        count.textContent = `${allLinks.length - individualBlockedUrls.length} of ${allLinks.length} links allowed`;
        container.appendChild(count);

        // Select all row
        const selectAllRow = document.createElement('div');
        selectAllRow.className = 'individual-link-row select-all-row';

        const selectAllLabel = document.createElement('label');
        selectAllLabel.className = 'individual-link-label';

        const selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.type = 'checkbox';
        selectAllCheckbox.id = 'select-all-checkbox';
        selectAllCheckbox.checked = true;

        const selectAllText = document.createElement('span');
        selectAllText.textContent = 'Select All';
        selectAllText.style.color = '#fff';

        selectAllLabel.appendChild(selectAllCheckbox);
        selectAllLabel.appendChild(selectAllText);
        selectAllRow.appendChild(selectAllLabel);
        container.appendChild(selectAllRow);

        const linkCheckboxes = [];

        allLinks.forEach(link => {
            const row = document.createElement('div');
            row.className = 'individual-link-row';

            const checkbox = document.createElement('input');
            checkbox.style['margin-top'] = '0.3rem';
            checkbox.type = 'checkbox';
            checkbox.checked = !blockedSet.has(link.url);
            linkCheckboxes.push(checkbox);

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    individualBlockedUrls = individualBlockedUrls.filter(u => u !== link.url);
                } else {
                    if (!individualBlockedUrls.includes(link.url)) {
                        individualBlockedUrls.push(link.url);
                    }
                }
                saveSettings();
                updateLinks(false);
                updateSelectAllState();
            });

            const label = document.createElement('label');
            label.className = 'individual-link-label';
            label.appendChild(checkbox);

            const info = document.createElement('div');
            info.className = 'individual-link-info';

            const name = document.createElement('span');
            name.className = 'individual-link-name';
            name.textContent = link.name || 'Untitled';

            const url = document.createElement('a');
            url.className = 'individual-link-url';
            url.href = link.url;
            url.target = '_blank';
            url.rel = 'noopener noreferrer';
            url.textContent = `(${link.url})`;

            info.appendChild(name);
            info.appendChild(document.createTextNode(' '));
            info.appendChild(url);

            label.appendChild(info);

            row.appendChild(label);
            container.appendChild(row);
        });

        function updateSelectAllState() {
            if (linkCheckboxes.length === 0) return;
            const total = linkCheckboxes.length;
            const checkedCount = linkCheckboxes.filter(cb => cb.checked).length;

            if (checkedCount === total) {
                selectAllCheckbox.checked = true;
                selectAllCheckbox.indeterminate = false;
            } else if (checkedCount === 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            } else {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = true;
            }

            count.textContent = `${checkedCount} of ${total} links allowed`;
        }

        selectAllCheckbox.addEventListener('change', () => {
            const checked = selectAllCheckbox.checked;
            linkCheckboxes.forEach(cb => { cb.checked = checked; });

            if (checked) {
                individualBlockedUrls = [];
            } else {
                individualBlockedUrls = allLinks.map(l => l.url);
            }

            saveSettings();
            updateLinks(false);
            updateSelectAllState();
        });

        updateSelectAllState();
        updateProgressBar()
    } catch (error) {
        container.innerHTML = '<p style="color:#f87171;">Failed to load links. Please try again.</p>';
        console.error('Failed to load individual filter links:', error);
    }
}

function populateFilterModePage() {
    const mode = document.querySelector('input[name="filter-mode"]:checked')?.value || 'lists';
    document.getElementById('lists-filter-section').style.display = mode === 'lists' ? 'block' : 'none';
    document.getElementById('individual-filter-section').style.display = mode === 'individual' ? 'block' : 'none';
    saveSettings();
    if (mode === 'individual') {
        loadIndividualFilter();
    }
    updateLinks(false);
    updateProgressBar();
}

function resetToDefaults() {
    document.getElementById('filter-tags-allowlist').value = DEFAULT_SETTINGS.lists.tagsAllowlist;
    document.getElementById('filter-tags-blocklist').value = DEFAULT_SETTINGS.lists.tagsBlocklist;
    document.getElementById('filter-urls-allowlist').value = DEFAULT_SETTINGS.lists.urlsAllowlist;
    document.getElementById('filter-urls-blocklist').value = DEFAULT_SETTINGS.lists.urlsBlocklist;

    const listsRadio = document.querySelector('input[name="filter-mode"][value="lists"]');
    if (listsRadio) listsRadio.checked = true;

    individualBlockedUrls = [...DEFAULT_SETTINGS.individual.blockedUrls];

    const splashToggle = document.getElementById('splash-toggle');
    if (splashToggle) splashToggle.checked = DEFAULT_SETTINGS.splashEnabled;

    populateFilterModePage();
}
