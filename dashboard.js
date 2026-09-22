/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

const API = 'https://backenddiscover.duckdns.org:8443/visitors-analytics';
const CHARTS = {};

const els = {
    country: document.getElementById('f-country'),
    month: document.getElementById('f-month'),
    platform: document.getElementById('f-platform'),
    bot: document.getElementById('f-bot'),
    status: document.getElementById('status'),
};

function buildQuery() {
    const p = new URLSearchParams();
    p.set('bot', els.bot.value);
    if (els.country.value !== 'all') p.set('country', els.country.value);
    if (els.month.value !== 'all') p.set('month', els.month.value);
    if (els.platform.value !== 'all') p.set('platform', els.platform.value);
    return p.toString();
}

function fillSelect(select, values, keepCurrent) {
    const current = keepCurrent ? select.value : 'all';
    select.innerHTML = '<option value="all">All</option>';
    values.forEach(v => {
        if (v === '' || v == null) return;
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
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
    if (CHARTS[id]) {
        CHARTS[id].data.labels = labels;
        CHARTS[id].data.datasets[0].data = data;
        CHARTS[id].update();
    } else {
        CHARTS[id] = new Chart(ctx, {
            type,
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: extra.color || 'rgba(74,222,128,0.6)',
                    borderColor: '#4ade80',
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

async function fetchData() {
    els.status.textContent = 'Loading…';
    try {
        const res = await fetch(`${API}?${buildQuery()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        els.status.textContent = `Error: ${e.message}`;
        return null;
    } finally {
        if (els.status.textContent === 'Loading…') els.status.textContent = 'Ready';
    }
}

async function refresh(initial = false) {
    const data = await fetchData();
    if (!data) return;

    if (initial) {
        fillSelect(els.country, data.byCountry.map(r => r.country));
        fillSelect(els.month, data.byMonth.map(r => r.month));
        fillSelect(els.platform, data.byPlatform.map(r => r.platform));
    }

    const topCountries = topN(data.byCountry, r => r.country, r => r.count, 15);
    makeOrUpdate('c-country', 'bar',
        topCountries.map(r => r.country || '(unknown)'),
        topCountries.map(r => r.count));

    const months = [...data.byMonth].sort((a, b) => String(a.month).localeCompare(String(b.month)));
    makeOrUpdate('c-month', 'line',
        months.map(r => r.month),
        months.map(r => r.count));

    const topPlat = topN(data.byPlatform, r => r.platform, r => r.count, 10);
    makeOrUpdate('c-platform', 'bar',
        topPlat.map(r => (r.platform || '(unknown)').slice(0, 24)),
        topPlat.map(r => r.count));

    makeOrUpdate('c-bot', 'pie',
        data.byBotStatus.map(r => r.status),
        data.byBotStatus.map(r => r.count),
        { color: ['rgba(74,222,128,0.7)', 'rgba(239,68,68,0.7)'] });

    // Visitors per hour of day (0-23), with empty hours filled as 0
    const hourMap = new Map(data.byHourOfDay.map(r => [Number(r.hour), r.count]));
    const hourLabels = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const hourData = hourLabels.map((_, i) => hourMap.get(i) || 0);
    makeOrUpdate('c-hour', 'bar', hourLabels, hourData);
}

[els.country, els.month, els.platform, els.bot].forEach(el =>
    el.addEventListener('change', () => refresh(false)));

refresh(true);