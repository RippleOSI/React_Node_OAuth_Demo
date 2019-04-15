import React, { Component} from 'react'
import user from '../auth/user';
import { Administrator, HealthcareWorker, Patient } from '../auth/roles';

const routes = [
  { 
    text: 'Home',
    link: '/',
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
  }
]


class NavigationBar extends Component {
  render() {
    return (
      <ul>
        {
          routes.filter((r) => user.isAuthorised(r.authorisation)).map((r) => (
            <NavigationLink route={r} />
          ))
        }
      </ul>
    )
  }
}

const NavigationLink = ({route}) => (
  <li className="navigation-link">
    <a href={route.link}>
      {route.text}
    </a>
  </li>
);

export default NavigationBar