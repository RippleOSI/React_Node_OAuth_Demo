var tokens = require("./tokens");

function authorize(user, authorizationRules) {    
  if (!authorizationRules || authorizationRules.length === 0) {
    return true;
  }

  if (authorizationRules.find((a) => a.authorize(user))) {
    return true;
  } 

  return false;
}

function getClientProfile(user) {
  return {
    id: user.id,
    displayName: user.displayName,
    administrator: user.administrator == "true",
    healthcareWorker: user.healthcareWorker == "true",
    patient: user.patient == "true"
  }
}

module.exports = function (authorizationRules) {
  return function secured (req, res, next) {
    if (!req.user) {
      req.session.returnTo = req.originalUrl;
      res.redirect('/login');      
    } else if (authorize(req.user, authorizationRules)) { 
      res.cookie('user', tokens.generateUserProfileJwt(getClientProfile(req.user)));
      return next(); 
    } else {
      res.redirect('/'); 
    }
  };
};

