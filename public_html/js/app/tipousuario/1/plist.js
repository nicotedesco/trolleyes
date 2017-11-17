/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
moduloTipousuario.controller('TipousuarioPList1Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, toolService, constantService, objectService) {
                $scope.ob = "tipousuario";
                $scope.op = "plist";
                $scope.profile = 1;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //----
                $scope.numpage = toolService.checkDefault(1, $routeParams.page);
                $scope.rpp = toolService.checkDefault(10, $routeParams.rpp);
                $scope.neighbourhood = constantService.getGlobalNeighbourhood();
                //---
                $scope.objectService = objectService;
                
                $scope.orderParams = toolService.checkEmptyString($routeParams.order);
                $scope.filterParams = toolService.checkEmptyString($routeParams.filter);
                //---      
                $scope.filter = {};
                $scope.filter.text = {};
                $scope.filter.number = {};
                $scope.filter.date = {};
                $scope.filter.boolean = {};
                $scope.filter.foreign = {};
                $scope.filter.text.field = "";
                $scope.filter.text.operator = "";
                $scope.filter.text.value = "";
                $scope.filter.number.field = "";
                $scope.filter.number.operator = "";
                $scope.filter.number.value = "";
                //---
                $scope.visibles = {};
                $scope.visibles.id = true;
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
                $scope.dofilter = function (filterType) {
                    if (filterType == 0) {
                        if ($scope.filter.text.field != "" && $scope.filter.text.operator != "" && $scope.filter.text.value != "") {
                            var newFilter = $scope.filterParams + "+and," + $scope.filter.text.field + "," + $scope.filter.text.operator + "," + $scope.filter.text.value;
                            if ($scope.orderParams) {
                                $location.path($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', newFilter).search('order', $scope.orderParams);
                            } else {
                                $location.path($scope.url + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', newFilter);
                            }
                        }
                    }
                    if (filterType == 1) {
                        if ($scope.filter.number.field != "" && $scope.filter.number.operator != "" && $scope.filter.number.value != "") {
                            var newFilter = $scope.filterParams + "+and," + $scope.filter.number.field + "," + $scope.filter.number.operator + "," + $scope.filter.number.value;
                            if ($scope.orderParams) {
                                $location.path($scope.ob + '/' + $scope.profile + '/' + $scope.op + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', newFilter).search('order', $scope.orderParams);
                            } else {
                                $location.path($scope.ob + '/' + $scope.profile + '/' + $scope.op + '/' + $scope.numpage + '/' + $scope.rpp).search('filter', newFilter);
                            }
                        }
                    }
                    return false;
                };
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