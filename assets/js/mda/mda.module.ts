import * as angular from 'angular';
import { Usuarios } from '../usuarios/usuarios.service';

export var mda = angular.module('mda', ['nsjRouting'])
                        .service('Usuarios', Usuarios)

                  
