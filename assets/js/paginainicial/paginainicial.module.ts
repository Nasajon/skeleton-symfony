import * as angular from 'angular';
import { PaginaInicialController } from './paginainicial.controller';
import { routingPaginaInicial } from './paginainicial.routes';


export const paginainicial =
  angular.module('paginainicial', ['ui.router'])
         .controller('PaginaInicialController', PaginaInicialController)
         .config(routingPaginaInicial);
       


