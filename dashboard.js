/* Copyright (c) [2026] [Mohammad Sheraj] */
/* [Discover] is licensed under India PubL v1. */
/* You can use this software according to the terms and conditions of the India PubL v1. */
/* You may obtain a copy of India PubL v1 at: */
/*          https://github.com/abirusabil123/discover/blob/main/IndiaPubL1 */
/* THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, */
/* EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, */
/* MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. */
/* See the India PubL v1 for more details. */

const CHARTS = {};

const els = {
    country: document.getElementById('f-country'),
    date: document.getElementById('f-date'),
    platform: document.getElementById('f-platform'),
    product: document.getElementById('f-product'),
    path: document.getElementById('f-path'),
    origin: document.getElementById('f-origin'),
    bot: document.getElementById('f-bot'),
    status: document.getElementById('status'),
    errorsStat: document.getElementById('errors-count'),
};

function buildQuery() {
    const p = new URLSearchParams();
    p.set('bot', els.bot.value);
    if (els.country.value !== 'all') p.set('country', els.country.value);
    if (els.date.value) p.set('date', els.date.value);
    if (els.platform.value !== 'all') p.set('platform', els.platform.value);
    if (els.product.value !== 'all') p.set('product', els.product.value);
    if (els.path.value !== 'all') p.set('path', els.path.value);
    if (els.origin.value !== 'all') p.set('origin', els.origin.value);
    return p.toString();
}

function fillSelect(select, values, keepCurrent) {
    const current = keepCurrent ? select.value : 'all';
    select.innerHTML = '<option value="all">All</option>';
    values.forEach(v => {
        if (v == null) return;
        const opt = document.createElement('option');
        opt.value = v === '' ? '(unknown)' : v;
        opt.textContent = v === '' ? '(unknown)' : v;
        select.appendChild(opt);
    });
    if ([...select.options].some(o => o.value === current)) {
        select.value = current;
    }
}

function topN(arr, keyFn, valFn, n) {
    return [...arr].sort((a, b) => valFn(b) - valFn(a)).slice(0, n);
}

function makeOrUpdate(id, type, labels, data, extra = {}) {
    const ctx = document.getElementById(id).getContext('2d');
    const bg = extra.colorFn
        ? labels.map(extra.colorFn)
        : 'green';

    if (CHARTS[id]) {
        CHARTS[id].data.labels = labels;
        CHARTS[id].data.datasets[0].data = data;
        CHARTS[id].data.datasets[0].backgroundColor = bg;
        CHARTS[id].update();
    } else {
        CHARTS[id] = new Chart(ctx, {
            type,
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: bg,
                    borderColor: 'white',
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                plugins: { legend: { display: type === 'pie' } },
                scales: type === 'pie' ? {} : {
                    y: { beginAtZero: true, ticks: { color: '#aaa' } },
                    x: { ticks: { color: '#aaa' } }
                },
            },
        });
    }
}

async function fetchUsageData() {
    try {
        return await apiCall(`/visitors-analytics?${buildQuery()}`);
    } catch (e) {
        if (e.name === 'AbortError') return null;   // navigating away
        els.status.textContent = `Error: ${e.message}`;
        return null;
    }
}

async function fetchErrorsData() {
    try {
        // No params → returns all unresolved errors (resolved = 0 by default)
        return await apiCall('/errors');
    } catch (e) {
        if (e.name === 'AbortError') return null;
        console.warn('Failed to fetch unresolved errors:', e.message);
        return null;   // ← null instead of [] so the guard fires and keeps the last value
    }
}

// Extract "YYYY-MM-DD" from a timestamp, tolerant of both ISO
// ("2026-11-20T01:56:35.000Z") and MySQL-style ("2026-11-20 01:56:35") strings.
function errorDateStr(err) {
    if (!err || !err.timestamp) return '';
    return String(err.timestamp).slice(0, 10);
}

async function fillUsageData() {
    const usageData = await fetchUsageData();
    if (!usageData) {
        return;
    }

    // Always rebuild the option lists so they only contain populated categories.
    // keepCurrent=true preserves the user's selection when it is still present.
    fillSelect(els.country, usageData.byCountry.map(r => r.country), true);
    fillSelect(els.platform, usageData.byPlatform.map(r => r.platform), true);
    fillSelect(els.product, usageData.byProduct.map(r => r.product), true);
    fillSelect(els.path, usageData.byPath.map(r => r.path), true);
    fillSelect(els.origin, usageData.byOrigin.map(r => r.origin), true);

    const topCountries = topN(usageData.byCountry, r => r.country, r => r.count, 8);
    makeOrUpdate('c-country', 'bar',
        topCountries.map(r => r.country || '(unknown)'),
        topCountries.map(r => r.count));

    const months = [...usageData.byMonth].sort((a, b) => String(a.month).localeCompare(String(b.month)));
    makeOrUpdate('c-month', 'line',
        months.map(r => r.month),
        months.map(r => r.count));

    const topPlat = topN(usageData.byPlatform, r => r.platform, r => r.count, 8);
    makeOrUpdate('c-platform', 'bar',
        topPlat.map(r => (r.platform || '(unknown)').slice(0, 32)),
        topPlat.map(r => r.count));

    const topProduct = topN(usageData.byProduct, r => r.product, r => r.count, 8);
    makeOrUpdate('c-product', 'bar',
        topProduct.map(r => (r.product || '(unknown)').slice(0, 32)),
        topProduct.map(r => r.count));

    const topPath = topN(usageData.byPath, r => r.path, r => r.count, 8);
    makeOrUpdate('c-path', 'bar',
        topPath.map(r => (r.path || '(unknown)').slice(0, 32)),
        topPath.map(r => r.count));

    const topOrigin = topN(usageData.byOrigin, r => r.origin, r => r.count, 8);
    makeOrUpdate('c-origin', 'bar',
        topOrigin.map(r => (r.origin || '(unknown)').slice(0, 32)),
        topOrigin.map(r => r.count));

    makeOrUpdate('c-bot', 'pie',
        usageData.byBotStatus.map(r => r.status),
        usageData.byBotStatus.map(r => r.count),
        {
            colorFn: (label) =>
                label === 'Bot' ? 'rgba(239,68,68,0.7)' : 'green'
        });

    // Visitors per hour of day (0-23), with empty hours filled as 0
    const hourMap = new Map(usageData.byHourOfDay.map(r => [Number(r.hour), r.count]));
    const hourLabels = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const hourData = hourLabels.map((_, i) => hourMap.get(i) || 0);
    makeOrUpdate('c-hour', 'bar', hourLabels, hourData);

    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayMap = new Map(usageData.byDayOfWeek.map(r => [Number(r.dow), r.count]));
    makeOrUpdate('c-day', 'bar', dayLabels, dayLabels.map((_, i) => dayMap.get(i) || 0));
}

async function fillErrorsData() {
    const errorsData = await fetchErrorsData();
    if (!errorsData) {
        return;
    }

    const selectedDate = els.date.value; // '' or 'YYYY-MM-DD'
    const filtered = selectedDate
        ? errorsData.filter(e => errorDateStr(e) === selectedDate)
        : errorsData;

    els.errorsStat.textContent = filtered.length;
    els.errorsStat.style.color = filtered.length === 0 ? 'green' : 'red';
}

async function refresh() {
    els.status.textContent = 'Loading…';
    await Promise.all([fillUsageData(), fillErrorsData()]);
    if (els.status.textContent === 'Loading…') {
        els.status.textContent = 'Ready';
    }
}

[els.country, els.date, els.platform, els.product, els.path, els.origin, els.bot].forEach(el =>
    el.addEventListener('change', () => refresh()));

document.addEventListener('keydown', (e) => {
    if (e.key === 'd' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
        location.href = 'index.html';
    }
});

refresh();