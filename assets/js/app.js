angular.module('main',
        [
            'ui.router',
            'ui.bootstrap',
            'mda',
            'ui.select',
            'ngSanitize',
            'mdaUiSelect',
            'ngMessages',
            'ngFileUpload',
            'angular-file-input',
            'angularModules',
            'angularMoment',
            'angular.filter',
            'toaster',
            'convertToNumber',
            'filters',
            'ui.mask', 
            'checklist-model',
            'ui.mask',
            'ngCpfCnpj',
            'dateInput'

        ])
        .config(['$locationProvider', '$urlRouterProvider', function ($locationProvider, $urlRouterProvider) {

                $locationProvider.html5Mode(true);
                $urlRouterProvider.otherwise('/tenants');
            }])
        .constant('angularMomentConfig', {
            timezone: 'America/Sao_Paulo'
        })
        .factory("Usuarios", ["$http", "nsjRouting", function ($http, nsjRouting) {
                var self = {
                    entities: [],
                    getProfile: function () {
                        return $http({method: 'GET', url: nsjRouting.generate('profile', true)});
                    }
                };

                return self;
            }]);
