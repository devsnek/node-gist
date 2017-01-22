'use strict';
const http = require('https');

module.exports = function (files, options) {
  return new Promise(function (resolve, reject) {
    options = options || { public: true, description: '' };
    if (typeof files === 'string') files = { 'default': {'content': files} };

    const body = {
      files: files,
      description: options.description,
      public: options.public
    };

    const req = http.request({
      host: 'api.github.com',
      port: 443,
      path: '/gists',
      method: 'POST',
      headers: {
        'User-Agent': 'node-gist',
        'Content-Type': 'application/json'
      }
    }, function (res) {
      res.body = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        res.body += chunk;
      });
      res.on('end', function () {
        try {
          resolve(JSON.parse(res.body));
        } catch (err) {
          reject(err);
        }
      });
      res.on('error', reject);
    });

    req.end(JSON.stringify(body));
  });
};
