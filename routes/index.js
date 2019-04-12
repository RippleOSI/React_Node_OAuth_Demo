var express = require('express');
var secured = require('../lib/middleware/secured');
var rules = require('../lib/middleware/rules');
var router = express.Router();

/* GET home page. */
router.get('/', secured(), function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

router.get('/administrator', secured(rules.AuthorizeAdministrator()), function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

router.get('/healthcareWorker', secured(rules.AuthorizeHealthcare()), function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

router.get('/patient', secured(rules.AuthorizePatient()), function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

module.exports = router;
