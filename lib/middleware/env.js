const scripts = {
  development: {
    app: '/scripts/main.js'
  },
  test: {
    app: '/scripts/main.min.js'
  },
  production: {
    app: '/scripts/main.min.js'
  }
}

const timestamp = (new Date()).getTime();

module.exports.getViewData = function (req) {
  const userEnvironment = req.cookies.environment || process.env.NODE_ENV || 'development'; 
  return {
    environment: process.env.NODE_ENV,
    timestamp: timestamp,
    scripts: scripts[userEnvironment]
  };
}