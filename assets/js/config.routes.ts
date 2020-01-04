export const routeConfig = ['$locationProvider', '$urlRouterProvider', '$httpProvider',
    ($locationProvider: angular.ILocationProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $httpProvider) => {
       // $httpProvider.interceptors.push('Interceptor');
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/paginainicial');        
    }];
