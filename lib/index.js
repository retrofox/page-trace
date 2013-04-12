
/**
 * Module dependencies.
 */

var debug = require('debug')('page-trace');

/**
 * Expose `pageTrace`.
 * Page.js middleware
 */

module.exports = pageTrace;

function pageTrace(ctx, next){
  if ('undefined' == typeof this.trace) {
    debug('init trace');
    this.trace = [];
    ctx.trace = this.trace;
    return next();
  }

  this.trace.splice(0, 0, ctx.path);
  debug('add `%s` trace - (%s)', ctx.path, this.trace.length);
  if (this.trace.length > 100) {
    debug('limit exceeded');
    this.trace.pop();
  }

  ctx.trace = this.trace;
  next();
}
