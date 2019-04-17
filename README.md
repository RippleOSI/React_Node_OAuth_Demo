# Ripple Auth0 Template

You can run this sample locally on your own machine, or deploy to a VPS or other cloud server. 

To run the sample from your own machine, skip the section 'Configuring the application for deployment' as it is set up to run by default on localhost:3000. 

To deploy to another server to run, first follow the configuration instructions then follow the 'Running the sample' instructions on the machine that you have deployed to. 

## Configuring the application for deployment

### 1. Set up environment variables

Add a file '.env' in the root of the application with the following values:

```
AUTH0_CLIENT_ID=[CLIENT_ID]
AUTH0_DOMAIN=[AUTH_DOMAIN]
AUTH0_CLIENT_SECRET=[CLIENT_SECRET]
AUTH0_CALLBACK_URL=http://[CLIENT_DOMAIN]:3000/callback
```

Where:
- AUTH_DOMAIN is the Domain of your Auth0 application
- CLIENT_ID is the id associated with the Auth0 application
- CLIENT_SECRET is the secret associated withe Auth0 application
- CLIENT_DOMAIN is the domain or IP address of the server you are deploying the application to

The first three values above can all be found in your auth0 dashboard:

![Dashboard screenshot](/readme/readme1.jpg "Dashboard screenshot")

### 2. Configure Auth0

You'll also need to ensure that the callback url is configured in auth0. To do this, you need to add:

```
http://[CLIENT_DOMAIN]:3000/callback
```

To the valid callbacks list in your auth0 dashboard. See the screenshot below.

![Dashboard screenshot](/readme/readme2.jpg "Dashboard screenshot")

## Running the sample

### ...without Docker

Install the dependencies.

```
bash
npm install
```

Run the app.

```
bash
npm start
```

The app will be served at `localhost:3000`.

### ...with Docker

In order to run the example with docker you need to have `docker` installed.

Execute in command line `sh exec.sh` to run the Docker in Linux, or `.\exec.ps1` to run the Docker in Windows.

## Troubleshooting

* If when you try and visit the application you receive a 404 or error page, it is likely that you haven't added a complete .env file
* If when you try and visit the application in your browser you see an Auth0 error without being given the chance to enter your username and password, it is likely that one or more of the values in your .env file is incorrect
* If you are able to enter your username and password but are then redirected to the wrong page, it is likely that the AUTH0_CALLBACK_URL you have used is incorrect.
* If you are able to enter your username and password but then auth0 shows you an error page without redirecting back to the app, it is likely that the callback url value you entered in the auth0 dashboard is incorrect.

## Application structure

### Application flow

The sample uses Auth0 for authentication and custom claims configured within Auth0 for authorisation. In practice, what this means is that when a user tries to gain access to the application, the following happens:

* The application checks for an existing user session (see 'Application Session' below). 
* If a user session is not found, the user is redirected to Auth0
* The user must enter a valid username and password into Auth0, which will authenticate them and then redirect them back to the application along with a signed user token - essentially an encoded string containing the users name and ID
* The application consumes this token and then makes a separate call to Auth0 to get more information about the user profile. 
* The user profile contains information about the user, including claims about the user's role (see 'User Claims' below)
* Based on the user's claims, the application decides whether or not to give access to a particular page - so, for example, a user with the claim "administrator: true" will be granted access to a page that is restricted to administrators, whereas a user without this claim will be redirected to the home page. 

### Auth0 Strategy

The integration with Auth0 that manages the above flow is handled by the Auth0 SDK, which implements a strategy for passport.

```
var strategy = new Auth0Strategy(
  {
    ... configuration details
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    ... custom authentication actions
  }
);

passport.use(strategy);
```

### Application Session

The application session is managed by Express and Passport, popular middleware for Node.js. The session is stored in a cookie and user information is serialised/deserialised using handlers configured in the main application file:

```
const namespace = "https://ripple.foundation/"
const roles = [
  "administrator", "healthcareWorker", "patient"
]
passport.deserializeUser(function (user, done) {
  roles.forEach(role => {
    user[role] = user._json[namespace + role];
  });
  done(null, user);
});

```

### User Claims

Custom user claims for the roles "administrator", "healthcareWorker" and "patient" can be configured in the auth0 dashboard. 

First, select Users & Roles, Users and select the user you want to update:

![Users screenshot](/readme/readme3.jpg "Users screenshot")

Next, scroll down and you should see and option to enter custom metadata.

![App data screenshot](/readme/readme4.jpg "App data screenshot")

Update the app_data section to add { [Role]: "true" } for any roles that the user should perform, and save the user. 

For example, if you want to configure the user's level of access to be Healthcare Worker, add the following:

```
{
  "healthcareWorker": "true"
}
```

### Authorising pages

In routes/index.js are some sample routes. Each route has three parameters:

1. The url for the route
2. The authorisation handler
3. The route handler

(1) and (3) should be familiar to any node developer so won't be covered here. (2) is where we check the user claims to see if a given user has access to the this particular route. 

The code that does this is in lib/middleware/rules.js and lib/middleware/secured.js. 

Rules.js defines a set of standard authorisation rules, e.g. AuthorizeHealthcare allows users access if they have either the administrator claim or the healthcareWorker claim, but not if they don't have either of these claims. The rules defined here are examples; more complex or varied rules based on claims or route parameters can be defined. 

Secured.js gets the user profile and valdiates it against the supplied rule, resulting in one of three outcomes:
* The user is not logged in, redirect them to the login page
* The user is logged in but is not authorised for this page, redirect them to the home page
* The user is logged in and they are authorised, grant them access.

### React integration

Though all of the authentication and authorisation is handled by Node.js, for a React app we also want to gain access to user profile and authorisation information on the client, e.g. to modify the information that we display or to enable changing views in React Router without having to check with the server whether a user is authorised with the server. 

There are various ways to do this, the way that this has been implemented in this application is as follows:

* When the user is authorised, the Node server attaches a cookie with relevant user information to the response. This allows the client access to user information without the client needing to worry about how that information was obtained. 

See the following line of code in secured.js:

```
res.cookie('user', tokens.generateUserProfileJwt(getClientProfile(req.user)));
```
* When routing, we add an authorisation handler to React router to check the user profile and validate that the given user should be allow access to this view, e.g. in src/router.js:
```
render={() => authorise(Administrator, (<BusinessIntelligence />))}
```
* We can also access user information from within a component to modify the output, e.g. in src/components/navigation.js, we don't display any navigation links that the user is not authorised to visit:
```
routes.filter((r) => user.isAuthorised(r.authorisation)).map((r, index) => (
  <NavigationLink route={r} key={index}/>
))
```