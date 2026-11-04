/* Copyright (c) 2025 Mohammad Sheraj */
/* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildVisitorWhere } = require('../utils/visitorFilter');

/* ---------------- non-raw defaults ---------------- */

test('no params → bot=0 + country guard', () => {
    const { whereClause, params } = buildVisitorWhere({});
    assert.equal(whereClause, "WHERE bot = 0 AND country <> ''");
    assert.deepEqual(params, []);
});

test('undefined query → same defaults', () => {
    const { whereClause, params } = buildVisitorWhere(undefined);
    assert.equal(whereClause, "WHERE bot = 0 AND country <> ''");
    assert.deepEqual(params, []);
});

test('bot=all → only country guard', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all' });
    assert.equal(whereClause, "WHERE country <> ''");
    assert.deepEqual(params, []);
});

test('bot=0 → parameterised + country guard', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: '0' });
    assert.equal(whereClause, "WHERE bot = ? AND country <> ''");
    assert.deepEqual(params, [0]);
});

test('bot=1 → parameterised + country guard', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: '1' });
    assert.equal(whereClause, "WHERE bot = ? AND country <> ''");
    assert.deepEqual(params, [1]);
});

/* ---------------- non-raw country ---------------- */

test('country=IN (bot=all) → country filter only', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', country: 'IN' });
    assert.equal(whereClause, 'WHERE country = ?');
    assert.deepEqual(params, ['IN']);
});

test('country=all → falls back to country guard', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', country: 'all' });
    assert.equal(whereClause, "WHERE country <> ''");
    assert.deepEqual(params, []);
});

/* ---------------- non-raw month / platform ---------------- */

test('month filter (non-raw)', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', month: '202601' });
    assert.equal(whereClause, 'WHERE country <> \'\' AND DATE_FORMAT(timestamp, "%Y%m") = ?');
    assert.deepEqual(params, ['202601']);
});

test('platform filter (non-raw)', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', platform: 'desktop' });
    assert.equal(whereClause, "WHERE country <> '' AND platform = ?");
    assert.deepEqual(params, ['desktop']);
});

/* ---------------- non-raw combined ---------------- */

test('all four filters, stable order bot/country/month/platform', () => {
    const { whereClause, params } = buildVisitorWhere({
        bot: '0', country: 'IN', month: '202601', platform: 'desktop'
    });
    assert.equal(
        whereClause,
        'WHERE bot = ? AND country = ? AND DATE_FORMAT(timestamp, "%Y%m") = ? AND platform = ?'
    );
    assert.deepEqual(params, [0, 'IN', '202601', 'desktop']);
});

test('legacy default (no bot) + country', () => {
    const { whereClause, params } = buildVisitorWhere({ country: 'IN' });
    assert.equal(whereClause, 'WHERE bot = 0 AND country = ?');
    assert.deepEqual(params, ['IN']);
});

test('empty strings treated as absent', () => {
    const { whereClause, params } = buildVisitorWhere({
        bot: 'all', country: '', month: '', platform: ''
    });
    assert.equal(whereClause, "WHERE country <> ''");
    assert.deepEqual(params, []);
});

/* ---------------- raw mode ---------------- */

test('raw=1 alone → no clauses', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1' });
    assert.equal(whereClause, '');
    assert.deepEqual(params, []);
});

test('raw=1 + bot=0 → bot filter only', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', bot: '0' });
    assert.equal(whereClause, 'WHERE bot = ?');
    assert.deepEqual(params, [0]);
});

test('raw=1 + bot=1 → bot filter only', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', bot: '1' });
    assert.equal(whereClause, 'WHERE bot = ?');
    assert.deepEqual(params, [1]);
});

test('raw=1 + bot=all → no clauses', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', bot: 'all' });
    assert.equal(whereClause, '');
    assert.deepEqual(params, []);
});

test('raw=1 + country=IN → country filter only', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', country: 'IN' });
    assert.equal(whereClause, 'WHERE country = ?');
    assert.deepEqual(params, ['IN']);
});

test('raw=1 + bot=1 + country=US → both filters, stable order', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', bot: '1', country: 'US' });
    assert.equal(whereClause, 'WHERE bot = ? AND country = ?');
    assert.deepEqual(params, [1, 'US']);
});

test('raw=1 + month still applies (no raw check on month)', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', month: '202601' });
    assert.equal(whereClause, 'WHERE DATE_FORMAT(timestamp, "%Y%m") = ?');
    assert.deepEqual(params, ['202601']);
});

test('raw=1 + platform still applies (no raw check on platform)', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', platform: 'desktop' });
    assert.equal(whereClause, 'WHERE platform = ?');
    assert.deepEqual(params, ['desktop']);
});

test('raw=1 + all four → stable order, params in order', () => {
    const { whereClause, params } = buildVisitorWhere({
        raw: '1', bot: '0', country: 'IN', month: '202601', platform: 'desktop'
    });
    assert.equal(
        whereClause,
        'WHERE bot = ? AND country = ? AND DATE_FORMAT(timestamp, "%Y%m") = ? AND platform = ?'
    );
    assert.deepEqual(params, [0, 'IN', '202601', 'desktop']);
});

test('date filter', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', date: '2026-09-23' });
    assert.match(whereClause, /DATE\(timestamp\) = \?/);
    assert.deepEqual(params, ['2026-09-23']);
});

test('malformed date ignored', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', date: 'not-a-date' });
    assert.equal(whereClause, "WHERE country <> ''");
    assert.deepEqual(params, []);
});

/* ---------------- non-raw product / path ---------------- */

test('product filter (non-raw)', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', product: 'discoverWebsite' });
    assert.equal(whereClause, "WHERE country <> '' AND product = ?");
    assert.deepEqual(params, ['discoverWebsite']);
});

test('product=(unknown) → empty-string equality', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', product: '(unknown)' });
    assert.equal(whereClause, "WHERE country <> '' AND product = ''");
    assert.deepEqual(params, []);
});

test('path filter (non-raw)', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', path: '/getLinks' });
    assert.equal(whereClause, "WHERE country <> '' AND path = ?");
    assert.deepEqual(params, ['/getLinks']);
});

test('path=(unknown) → empty-string equality', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', path: '(unknown)' });
    assert.equal(whereClause, "WHERE country <> '' AND path = ''");
    assert.deepEqual(params, []);
});

test('product + path combined (non-raw)', () => {
    const { whereClause, params } = buildVisitorWhere({
        bot: 'all', product: 'discoverWebsite', path: '/getLinks'
    });
    assert.equal(whereClause, "WHERE country <> '' AND product = ? AND path = ?");
    assert.deepEqual(params, ['discoverWebsite', '/getLinks']);
});

/* ---------------- raw mode product / path ---------------- */

test('raw=1 + product → product filter only', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', product: 'discoverWebsite' });
    assert.equal(whereClause, 'WHERE product = ?');
    assert.deepEqual(params, ['discoverWebsite']);
});

test('raw=1 + path → path filter only', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', path: '/getLinks' });
    assert.equal(whereClause, 'WHERE path = ?');
    assert.deepEqual(params, ['/getLinks']);
});

/* ---------------- full-order guard ---------------- */

test('all filters → stable order bot/country/month/date/platform/product/path', () => {
    const { whereClause, params } = buildVisitorWhere({
        bot: '0', country: 'IN', month: '202601', date: '2026-01-15',
        platform: 'desktop', product: 'discoverWebsite', path: '/getLinks'
    });
    assert.equal(
        whereClause,
        'WHERE bot = ? AND country = ? AND DATE_FORMAT(timestamp, "%Y%m") = ? '
        + 'AND DATE(timestamp) = ? AND platform = ? AND product = ? AND path = ?'
    );
    assert.deepEqual(params, [0, 'IN', '202601', '2026-01-15', 'desktop', 'discoverWebsite', '/getLinks']);
});