/**
 * Build a parameterised WHERE clause for /visitors-analytics.
 *
 * Supported query params (all optional):
 *   country  – country code, or "all" to ignore
 *   month    – YYYYMM, or "all" to ignore
 *   platform – platform string, or "all" to ignore
 *   bot      – "0" humans, "1" bots, "all" both, undefined → legacy default (humans only)
 *   from     – YYYY-MM-DD inclusive lower bound on timestamp (not yet wired)
 *   to       – YYYY-MM-DD inclusive upper bound on timestamp (not yet wired)
 *   raw      – "1" disables all *implicit* default guards (legacy bot=0, country<>'').
 *              Explicit filters (country, month, platform, bot=0/1) are still honoured.
 *
 * Returns { whereClause, params }
 *   whereClause is "" or "WHERE ... AND ..."
 *   params      is an array matching the ? placeholders in order
 */
function buildVisitorWhere(query) {
    const { country, month, platform, bot, raw } = query || {};
    const isRaw = raw === '1';
    const conditions = [];
    const params = [];

    // Bot handling:
    //   explicit bot=0 or bot=1 → always applied (even in raw mode)
    //   bot=all or raw mode     → no bot filter
    //   otherwise (no bot)      → legacy default bot = 0
    if (bot === '0' || bot === '1') {
        conditions.push('bot = ?');
        params.push(parseInt(bot, 10));
    } else if (bot === 'all' || isRaw) {
        // no bot filter
    } else {
        conditions.push('bot = 0');
    }

    // Country handling
    if (country && country !== 'all') {
        conditions.push('country = ?');
        params.push(country);
    } else if (!isRaw) {
        conditions.push("country <> ''");
    }

    // Month handling
    if (month && month !== 'all') {
        conditions.push('DATE_FORMAT(timestamp, "%Y%m") = ?');
        params.push(month);
    }

    // Platform handling
    if (platform && platform !== 'all') {
        conditions.push('platform = ?');
        params.push(platform);
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
    return { whereClause, params };
}

module.exports = { buildVisitorWhere };