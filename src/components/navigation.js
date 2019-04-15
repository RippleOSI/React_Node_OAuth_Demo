import React, { Component} from 'react'
import user from '../auth/user';
import { Administrator, HealthcareWorker, Patient, LoggedIn } from '../auth/roles';
import { Link } from 'react-router-dom';

const routes = [
  { 
    text: 'Home',
    link: '/'
  },
  { 
    text: 'Business Intelligence',
    link: '/business-intelligence',
    authorisation: Administrator
  },
  {
    text: 'Multi Patient',
    link: '/multi-patient',
    authorisation: HealthcareWorker
  },
  {
    text: 'Single Patient',
    link: '/single-patient',
    authorisation: Patient
  },  
]


class NavigationBar extends Component {
  render() {
    return (
      <div className="navigation-bar">
        <ul className="navigation-list">
          {
            routes.filter((r) => user.isAuthorised(r.authorisation)).map((r, index) => (
              <NavigationLink route={r} key={index}/>
            ))
          }
          <li className="navigation-list-item">
            <a className="navigation-link" href="/logout">
              Logout
            </a>
          </li>
          
        </ul>
      </div>
    )
  }
}

const NavigationLink = ({route}) => (
  <li className="navigation-list-item">
    <Link className="navigation-link" to={route.link}>
      {route.text}
    </Link>
  </li>
);

export default NavigationBar