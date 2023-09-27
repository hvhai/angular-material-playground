export const environment = {
  production: false,
  auth0: {
    domain: 'dev-codehunter.auth0.com',
    clientId: 'sNYVOrixNb0ZyE0WZnxvurbuOYTmX9SK',
    authorizationParams: {
      redirect_uri: 'http://localhost:8080/callback',
    },
  },
  api: {
    serverUrl: 'http://localhost:8080',
  },
};
