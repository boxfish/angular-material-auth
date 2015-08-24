'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function NavCtrl($rootScope, $scope, $location, AuthService) {
  $scope.user = AuthService.user;

  $scope.logOut = function() {
    AuthService.logOut(function() {
      $location.path('/login');
    }, function() {
      $rootScope.error = "Failed to logout";
    });
  };
}

controllersModule.controller('NavCtrl', NavCtrl);
