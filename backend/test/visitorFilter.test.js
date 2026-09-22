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