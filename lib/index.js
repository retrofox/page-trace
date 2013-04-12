
/**
 * Module dependencies.
 */

var debug = require('debug')('page-trace');

/**
 * Expose `pageTrace`.
 * Page.js middleware
 */

module.exports = pageTrace;

/**
 * Trace array container
 */

var trace;

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
