const test = require('node:test');
const assert = require('node:assert/strict');
const { buildVisitorWhere } = require('../utils/visitorFilter');

test('no params → bot=0 default and all guards', () => {
    const { whereClause, params } = buildVisitorWhere({});
    assert.equal(whereClause, "WHERE bot = 0 AND country <> '' AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, []);
});

test('undefined query → same defaults', () => {
    const { whereClause, params } = buildVisitorWhere(undefined);
    assert.equal(whereClause, "WHERE bot = 0 AND country <> '' AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, []);
});

test('bot=all → no bot clause, guards only', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all' });
    assert.equal(whereClause, "WHERE country <> '' AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, []);
});

test('bot=0 → parameterised plus guards', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: '0' });
    assert.equal(whereClause, "WHERE bot = ? AND country <> '' AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, [0]);
});

test('bot=1 → parameterised plus guards', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: '1' });
    assert.equal(whereClause, "WHERE bot = ? AND country <> '' AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, [1]);
});

test('country=IN → explicit country, no country guard', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', country: 'IN' });
    assert.equal(whereClause, "WHERE country = ? AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, ['IN']);
});

test('country=all → falls back to country guard', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', country: 'all' });
    assert.equal(whereClause, "WHERE country <> '' AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, []);
});

test('month filter', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', month: '202601' });
    assert.equal(
        whereClause,
        'WHERE country <> \'\' AND DATE_FORMAT(timestamp, "%Y%m") = ? AND platform <> \'\' AND origin <> \'\''
    );
    assert.deepEqual(params, ['202601']);
});

test('platform filter → explicit platform, no platform guard', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', platform: 'desktop' });
    assert.equal(whereClause, "WHERE country <> '' AND platform = ? AND origin <> ''");
    assert.deepEqual(params, ['desktop']);
});

test('all four filters in stable order bot, country, month, platform', () => {
    const { whereClause, params } = buildVisitorWhere({
        bot: '0', country: 'IN', month: '202601', platform: 'desktop'
    });
    assert.equal(
        whereClause,
        'WHERE bot = ? AND country = ? AND DATE_FORMAT(timestamp, "%Y%m") = ? AND platform = ? AND origin <> \'\''
    );
    assert.deepEqual(params, [0, 'IN', '202601', 'desktop']);
});

test('legacy default plus extra country filter', () => {
    const { whereClause, params } = buildVisitorWhere({ country: 'IN' });
    assert.equal(whereClause, "WHERE bot = 0 AND country = ? AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, ['IN']);
});

test('empty-string values are ignored (treated as absent)', () => {
    const { whereClause, params } = buildVisitorWhere({
        bot: 'all', country: '', month: '', platform: ''
    });
    assert.equal(whereClause, "WHERE country <> '' AND platform <> '' AND origin <> ''");
    assert.deepEqual(params, []);
});

test('raw=1 → no default guards', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1' });
    assert.equal(whereClause, '');
    assert.deepEqual(params, []);
});

test('raw=1 with explicit bot and country', () => {
    const { whereClause, params } = buildVisitorWhere({ raw: '1', bot: '1', country: 'US' });
    assert.equal(whereClause, 'WHERE bot = ? AND country = ?');
    assert.deepEqual(params, [1, 'US']);
});