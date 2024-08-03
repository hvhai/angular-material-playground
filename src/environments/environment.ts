export const environment = {
  production: false,
  auth0: {
    domain: 'dev-codehunter.auth0.com',
    clientId: 'sNYVOrixNb0ZyE0WZnxvurbuOYTmX9SK',
    authorizationParams: {
      audience: 'https://dev-codehunter.auth0.com/api/v2/',
      redirect_uri: 'http://localhost:4200/callback',
    },
  },
  api: {
    serverUrl: 'http://localhost:8080/api/countdown-timer',
    foodOrderingApiUrl: 'http://localhost:8080/api/fruit-ordering',
  },
};
