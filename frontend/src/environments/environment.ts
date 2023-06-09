export const environment = {
  production: false,
  apiUrl: 'http://localhost:8082',
  tokenAllowedDomains: [  /localhost:8082/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],
}
