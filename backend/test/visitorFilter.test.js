const test = require('node:test');
const assert = require('node:assert/strict');
const { buildVisitorWhere } = require('../utils/visitorFilter');

test('no params → legacy default bot = 0 and no empty country', () => {
    const { whereClause, params } = buildVisitorWhere({});
    assert.equal(whereClause, "WHERE bot = 0 AND country <> ''");
    assert.deepEqual(params, []);
});

test('undefined query → legacy default bot = 0 and no empty country', () => {
    const { whereClause, params } = buildVisitorWhere(undefined);
    assert.equal(whereClause, "WHERE bot = 0 AND country <> ''");
    assert.deepEqual(params, []);
});

test('bot=all → only country <> empty clause', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all' });
    assert.equal(whereClause, "WHERE country <> ''");
    assert.deepEqual(params, []);
});

test('bot=0 → parameterised plus country <> empty', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: '0' });
    assert.equal(whereClause, "WHERE bot = ? AND country <> ''");
    assert.deepEqual(params, [0]);
});

test('bot=1 → parameterised plus country <> empty', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: '1' });
    assert.equal(whereClause, "WHERE bot = ? AND country <> ''");
    assert.deepEqual(params, [1]);
});

test('country=IN', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', country: 'IN' });
    assert.equal(whereClause, 'WHERE country = ?');
    assert.deepEqual(params, ['IN']);
});

test('country=all → falls back to country <> empty', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', country: 'all' });
    assert.equal(whereClause, "WHERE country <> ''");
    assert.deepEqual(params, []);
});

test('month filter', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', month: '202601' });
    assert.equal(whereClause, 'WHERE country <> \'\' AND DATE_FORMAT(timestamp, "%Y%m") = ?');
    assert.deepEqual(params, ['202601']);
});

test('platform filter', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', platform: 'desktop' });
    assert.equal(whereClause, "WHERE country <> '' AND platform = ?");
    assert.deepEqual(params, ['desktop']);
});

test('all four filters in stable order bot, country, month, platform', () => {
    const { whereClause, params } = buildVisitorWhere({
        bot: '0', country: 'IN', month: '202601', platform: 'desktop'
    });
    assert.equal(
        whereClause,
        'WHERE bot = ? AND country = ? AND DATE_FORMAT(timestamp, "%Y%m") = ? AND platform = ?'
    );
    assert.deepEqual(params, [0, 'IN', '202601', 'desktop']);
});

test('legacy default plus extra country filter', () => {
    const { whereClause, params } = buildVisitorWhere({ country: 'IN' });
    assert.equal(whereClause, 'WHERE bot = 0 AND country = ?');
    assert.deepEqual(params, ['IN']);
});

test('empty-string values are ignored (treated as absent)', () => {
    const { whereClause, params } = buildVisitorWhere({ bot: 'all', country: '', month: '', platform: '' });
    assert.equal(whereClause, "WHERE country <> ''");
    assert.deepEqual(params, []);
});

test('country empty by default → country <> empty clause added', () => {
    const { whereClause } = buildVisitorWhere({ bot: 'all' });
    assert.equal(whereClause, "WHERE country <> ''");
});