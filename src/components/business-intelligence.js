import React, { Component } from 'react';

import Layout from './layout';

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <div className="demo-panel">
          <img src="/images/business-intelligence-view.png" />
        </div>
      </Layout>
    )
  }
}

export default Dashboard;