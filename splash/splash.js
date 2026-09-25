/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

(async function () {
    const splash = document.getElementById('splash');
    if (!splash) return;

    const s = JSON.parse(localStorage.getItem('discover-settings') || '{}');
    if (s.splashEnabled !== true) { splash.classList.add('splash-off'); return; }

    const SURAHS = [
        '01-fatiha.html',
        '02-ikhlas.html',
        '03-falaq.html',
        '04-nas.html',
        '05-kawthar.html',
        '06-asr.html',
        '07-kafirun.html',
    ];

    // Day boundary at 06:00 local
    const SIX_HOURS = 6 * 60 * 60 * 1000;
    const DAY = 24 * 60 * 60 * 1000;
    const dayIndex = Math.floor((Date.now() - SIX_HOURS) / DAY);
    const idx = ((dayIndex % SURAHS.length) + SURAHS.length) % SURAHS.length;

    try {
        const res = await fetch('splash/' + SURAHS[idx]);
        if (!res.ok) throw new Error('load failed');
        document.getElementById('splash-body').innerHTML = await res.text();
    } catch (e) {
        console.error('Splash load failed:', e);
        // leave #splash-body empty; the outer .splash still covers the page
    }
})();