
/**
 * Module dependencies.
 */

var debug = require('debug')('page-trace');

/**
 * Trace array var
 */

var trace;

/**
 * Expose `pageTrace`.
 * Page.js middleware
 */

module.exports = pageTrace;

/**
 * pageTrace
 *
 * @param {Object} ctx
 * @param {Function} next
 * @api public
 */

function pageTrace(ctx, next){
  if ('undefined' == typeof trace) {
    debug('init trace');
    trace = [];
    ctx.trace = trace;
    return next();
  }

  trace.splice(0, 0, ctx.path);
  debug('add `%s` trace - (%s)', ctx.path, trace.length);
  if (trace.length > 100) {
    debug('limit exceeded');
    trace.pop();
  }

  ctx.trace = trace;
  next();
}
