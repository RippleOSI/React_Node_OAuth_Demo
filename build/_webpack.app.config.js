const merge = require('webpack-merge');
const targetConfig = require('./webpack.target');
const moduleConfig = require('./webpack.modules');
const output = require('./webpack.output');

const environmentConfig = {
  'development': {
    mode: 'development',
    output: output.app.dev
  },
  'production': {
    mode: 'production',
    output: output.app.prod
  }
}

const commonConfig = merge(
  targetConfig.app,
  moduleConfig.modules
);

module.exports = (env) => merge(commonConfig, environmentConfig[env.environment]);