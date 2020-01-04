import { IState } from "angular-ui-router";

export const routingPaginaInicial = ['$stateProvider',
    ($stateProvider: angular.ui.IStateProvider ) => {
      $stateProvider
      .state('paginainicial', {
        url: '/paginainicial',
        breadcrumb:'Página Inicial',
        template: require('html-loader!../../view/paginainicial/paginainicial.html')
      } as IState);
    }];
