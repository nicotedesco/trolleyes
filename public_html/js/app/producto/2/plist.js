/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
moduloProducto.controller('ProductoPList2Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', 'toolService', 'constantService','objectService',
            function ($scope, $routeParams, $location, serverCallService, toolService, constantService,objectService) {
                $scope.ob = "producto";
                $scope.op = "plist";
                $scope.profile = 2;
                //---
                $scope.status = null;
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //----
                $scope.numpage = toolService.checkDefault(1, $routeParams.page);
                $scope.rpp = toolService.checkDefault(10, $routeParams.rpp);
                $scope.neighbourhood = constantService.getGlobalNeighbourhood();
                //---
                $scope.orderParams = toolService.checkEmptyString($routeParams.order);
                $scope.filterParams = toolService.checkEmptyString($routeParams.filter);
                
                 $scope.objectService = objectService;
                //---      
                $scope.filterString = [{'name': 'codigo', 'longname': 'Código'}, {'name': 'descripcion', 'longname': 'Nombre'}];
                $scope.filterNumber = [{'name': 'id', 'longname': 'Identificador'},{'name': 'existencias', 'longname': 'Existencias'},{'name': 'precio', 'longname': 'Precio'}];
                //---
                $scope.visibles = {};
                $scope.visibles.id = true;
                $scope.visibles.codigo = true;
                $scope.visibles.existencias = true;
                $scope.visibles.precio = true;
                $scope.visibles.descripcion = true;
               
                //---
                function getDataFromServer() {
                    serverCallService.getCount($scope.ob, $scope.filterParams).then(function (response) {
                        if (response.status == 200) {
                            $scope.registers = response.data.json;
                            $scope.pages = toolService.calculatePages($scope.rpp, $scope.registers);
                            if ($scope.numpage > $scope.pages) {
                                $scope.numpage = $scope.pages;
                            }
                            return serverCallService.getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterParams, $routeParams.order);
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    }).then(function (response) {
                        if (response.status == 200) {
                            $scope.page = response.data.json;
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor";
                    });
                }
                $scope.doorder = function (orderField, ascDesc) {
                    $location.url($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', $scope.filterParams).search('order', orderField + ',' + ascDesc);
                    return false;
                };
                $scope.close = function () {
                    $location.path('/home');
                };
                getDataFromServer();
            }
        ]);

