export const environment = {
  production: false,
  apiUrl: 'https://money-api.herokuapp.com/',
  tokenAllowedDomains: [ /money-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],
}
