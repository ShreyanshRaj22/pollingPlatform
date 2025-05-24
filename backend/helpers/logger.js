// helpers/logger.js
const logger = {
    info: (...params) => console.log('[INFO]', ...params),
    warn: (...params) => console.warn('[WARN]', ...params),
    error: (...params) => console.error('[ERROR]', ...params),
};

module.exports = logger;
