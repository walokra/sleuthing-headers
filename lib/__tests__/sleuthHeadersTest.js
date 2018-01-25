const assert = require('assert');
var request = require('supertest');

var express = require('express');
const { createSleuthHeaders, setSleuthHeaders } = require('../sleuthHeaders');

describe('sleuthHeaders.js', () => {
  test('create Sleuth headers for path', () => {
    var app = express();

    const createHeaders = createSleuthHeaders('/test-path');

    app.use((req, res, next) => {
      res.setHeader(createHeaders);
      next();
    });

    app.use((req, res) => {
      res.end('Hello world!');
    });

    request(app)
      .get('/')
      .expect('X-Span-Name', '/test-path')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console

        assert.notEqual(res.headers['X-B3-TraceId'], '');
        assert.notEqual(res.headers['X-B3-SpanId'], '');
      });
  });

  test('set Sleuth headers', () => {
    var app = express();

    app.use((req, res, next) => {
      setSleuthHeaders(req);
      next();
    });

    app.use((req, res) => {
      res.end('Hello world!');
    });

    request(app)
      .get('/')
      .expect('X-Span-Name', '/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.notEqual(res.headers['X-B3-TraceId'], '');
        assert.notEqual(res.headers['X-B3-SpanId'], '');
      });
  });
});
