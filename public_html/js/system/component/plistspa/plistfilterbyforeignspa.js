/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
moduloDirectivas.component('plistfilterbyforeignspa', {
    restrict: 'E',
    bindings: {
        field: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<',
        profile: '<'
    },
    templateUrl: 'js/system/component/plistspa/plistfilterbyforeignspa.html',
    controllerAs: 'filterbyforeign',
    controller:
            ['$rootScope',
                function ($rootScope) {
                    var self = this;
                    self.operator = "";

                    self.obj_foreign = {"id": 1};


                    //[{'name':'id_tipousuario','longname':'Tipo de usuario','reference':'tipousuario','description':'['descripcion']'}]



                    self.dofilter = function () {
                        if (self.operator != "" && self.value != "") {
                            var newFilter = self.filterparams + "+and," + self.field.name + "," + self.operator + "," + self.obj_foreign.id;
                            $rootScope.$broadcast('filterSelectionEvent', newFilter);
                        }
                        return false;
                    };
                }
            ]
});