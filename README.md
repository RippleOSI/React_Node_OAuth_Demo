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