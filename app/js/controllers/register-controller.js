'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function RegisterCtrl($rootScope, $scope, $location, AuthService) {
  $scope.register = function() {
    AuthService.register({
      username: $scope.username,
      password: $scope.password
    },
    function() {
      $location.path('/');
    },
    function(err) {
      $rootScope.error = err;
    });
  };
}

controllersModule.controller('RegisterCtrl', RegisterCtrl);
