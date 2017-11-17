/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

moduloProducto.controller('ProductoNew1Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', '$filter', '$uibModal', 'sessionService', '$route', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, $filter, $uibModal, sessionService, $route, toolService, constantService, objectService) {
                $scope.ob = "producto";
                $scope.op = "new";
                $scope.profile = 1;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                $scope.bean = {};
                //$scope.bean.obj_tipousuario = {"id": 0};
                //---
                $scope.objectService = objectService;
                //---
                $scope.save = function () {
                    var jsonToSend = {json: JSON.stringify(toolService.array_identificarArray($scope.bean))};
                    serverCallService.set($scope.ob, jsonToSend).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                $scope.response = response;
                                $scope.status = "El registro se ha creado con id=" + response.data.json;
                                $scope.bean.id = response.data.json;
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor";
                            }
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor";
                    });
                    ;
                };
                $scope.back = function () {
                    window.history.back();
                };
                $scope.close = function () {
                    $location.path('/home');
                };
            }
        ]);