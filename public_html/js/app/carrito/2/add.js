'use strict';

moduloCarrito.controller('CarritoAdd2Controller',
        ['$scope', '$routeParams', 'serverCallService', '$location', 'sessionService', 'constantService','objectService',
            function ($scope, $routeParams, serverCallService, $location, sessionService, constantService,objectService) {
                $scope.ob = "carrito";
                $scope.op = "add";
                $scope.profile = 2;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                $scope.bean = {};
                $scope.bean.cantidad = 0;
                $scope.bean.id = $routeParams.id;
                //---
                $scope.objectService = objectService;
                //---
                
                $scope.add = function () {
                    serverCallService.add($scope.ob, $scope.id, $scope.cantidad).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                $scope.bean.id = response.data.json;
                                $scope.status = "El registro con id=" + $scope.id + " y cantidad="+ $scope.cantidad +"se ha añadido al carro.";
                           
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor 2";
                            }
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor 3";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor 4";
                    });
                }
                $scope.back = function () {
                    window.history.back();
                };
                $scope.close = function () {
                    $location.path('/home');
                };
}]);


