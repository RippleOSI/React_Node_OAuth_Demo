import React, { Component } from 'react';

import Layout from './layout';

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <div className="demo-panel">
          <img src="/images/multi-patient-view.png" />
        </div>
      </Layout>
    )
  }
}

export default Dashboard;