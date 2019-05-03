angular.module('main',
        [
            'ui.router',
            'ui.bootstrap',
            'mda',
            'ui.select',
            'ngSanitize',
            'mdaUiSelect',
            'ngMessages',
            'objectList',
            'ngFileUpload',
            'angular-file-input',
            'angularMoment',
            'angular.filter',
            'toaster',
            'convertToNumber',
            'ntt.TreeDnD',
            'filters',
            'ui.mask',
            'checklist-model',
            'ui.mask',
            'ngCpfCnpj',
            'dateInput',
            'nasajon-ui',
            'innerForm'

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
