/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/login`.
 *
 */
module.exports = function (authorizationRules) {
  return function secured (req, res, next) {
    if (!req.user) {
      req.session.returnTo = req.originalUrl;
      res.redirect('/login');      
    } else if (authorize(req.user, authorizationRules)) { 
      return next(); 
    } else {
      res.redirect('/'); 
    }
  };
};

function authorize(user, authorizationRules) {    
  if (!authorizationRules || authorizationRules.length === 0) {
    return true;
  }

  if (authorizationRules.find((a) => a.authorize(user))) {
    return true;
  } 

  return false;
}

