import * as angular from 'angular';

import { routeConfig } from './config.routes';
import { mda } from './mda/mda.module';
import { paginainicial } from './paginainicial/paginainicial.module';


    angular.module('app',
        [
            'ui.router',
            'ui.bootstrap',
            'ui.select',
            'ngSanitize',
            'mdaUiSelect',
            'ngMessages',
            'objectList',
            'angular-file-input',
            'angularMoment',
            'angular.filter',
            'toaster',
            'convertToNumber',
            'filters',
            'ui.mask',
            'ngCpfCnpj',
            'dateInput',
            'nasajon-ui',
            'innerForm',
            'multipleDatePicker',                       
            mda.name,
            paginainicial.name
        ])
        .config(routeConfig)
     