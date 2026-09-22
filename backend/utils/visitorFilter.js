/**
 * Build a parameterised WHERE clause for /visitors-analytics.
 *
 * Supported query params (all optional):
 *   country  – country code, or "all" to ignore
 *   month    – YYYYMM, or "all" to ignore
 *   platform – platform string, or "all" to ignore
 *   bot      – "0" humans, "1" bots, "all" both, undefined → legacy default (humans only)
 *
 * Returns { whereClause, params }
 *   whereClause is "" or "WHERE ... AND ..."
 *   params      is an array matching the ? placeholders in order
 */
function buildVisitorWhere(query) {
    const { country, month, platform, bot } = query || {};
    const conditions = [];
    const params = [];

    if (bot === 'all') {
        // no bot filter
    } else if (bot === '0' || bot === '1') {
        conditions.push('bot = ?');
        params.push(parseInt(bot, 10));
    } else {
        // legacy default: keep existing behaviour for callers that pass no bot param
        conditions.push('bot = 0');
    }

    if (country && country !== 'all') {
        conditions.push('country = ?');
        params.push(country);
    } else {
        // Always exclude rows with no country detected (localhost, internal probes)
        conditions.push("country <> ''");
    }

    if (month && month !== 'all') {
        conditions.push('DATE_FORMAT(timestamp, "%Y%m") = ?');
        params.push(month);
    }

    if (platform && platform !== 'all') {
        conditions.push('platform = ?');
        params.push(platform);
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
    return { whereClause, params };
}

module.exports = { buildVisitorWhere };