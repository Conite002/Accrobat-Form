var fs = require('fs');
var url = require('url');
var path = require('path');
var spawn = require('child_process').spawn;
var CGIParser = require('cgi/parser');

module.exports = function (cgiPath, callback) {
  return function (req, res, next) {
    try {
      var stat = fs.statSync(cgiPath);
    //   if (! stat.isFile() || (stat.mode & parseInt('111', 8)) == 0) {
    //     return next(new Error('cgi file\'s mode = ' + stat.mode + ' cgiPath = ' + cgiPath));
    //   }
    } catch (err) {
      return next(err);
    }

    console.log('req c***', req.method, req.params, req.query, req.body, req.url, req.headers, req.file);
    var parsedUrl = url.parse(req.url);
    // var env = {
    //   REQUEST_METHOD: req.method,
    //   QUERY_STRING: parsedUrl.query || ''
    // };
    // if ('content-length' in req.headers) {
    //   env.CONTENT_LENGTH = req.headers['content-length'];
    // }
    // var options = { cwd: path.dirname(cgiPath), env: env };
    // if (callback) callback(req, options);
    // var proc = spawn(cgiPath, [], options);
    // req.pipe(proc.stdin);
    // var result = new CGIParser(proc.stdout);
    // result.on('headers', function (headers) {
    //   headers.forEach(function (header) {
    //     if (header.key === 'Status') return;
    //     res.setHeader(header.key, header.value);
    //   });
    //   res.statusCode = parseInt(headers.status, 10) || 200;
    //   result.pipe(res);
    // });
    // proc.on('exit', function (code, signal) {
    //   if (code || signal) {
    //     next(new Error('cgi proc died: code = ' + code + ', signal = ' + signal));
    //   }
    // });
    // proc.stdout.on('end', function () {
    //   if (result) result.cleanup();
    // });
  };
};
