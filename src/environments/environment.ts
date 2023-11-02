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
    serverUrl: 'https://coundown-timer-service.onrender.com',
  },
};
