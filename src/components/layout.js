import React, { Component } from 'react';
import NavigationBar from './navigation'

class Layout extends Component {

  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;