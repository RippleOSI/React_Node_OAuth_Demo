var express = require('express');
var env = require('../lib/middleware/env');
var secured = require('../lib/middleware/secured');
var rules = require('../lib/middleware/rules');
var router = express.Router();

/* GET home page. */
router.get('/', secured(), function (req, res, next) {
  res.render('index', env.getViewData(req));
});

router.get('/business-intelligence', secured(rules.AuthorizeAdministrator()), function (req, res, next) {
  res.render('index', env.getViewData(req));
});

router.get('/multi-patient', secured(rules.AuthorizeHealthcare()), function (req, res, next) {
  res.render('multi', env.getViewData(req));
});

router.get('/single-patient', secured(rules.AuthorizePatient()), function (req, res, next) {
  res.render('index', env.getViewData(req));
});

module.exports = router;
