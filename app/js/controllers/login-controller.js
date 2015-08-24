'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginCtrl($rootScope, $scope, $location, $window, AuthService) {
  $scope.user = {
    email: "",
    password: "",
    rememberMe: true
  };

  $scope.logIn = function() {
    AuthService.logIn($scope.user, function(user) {
      $location.path('/');
    },
    function(err) {
      $rootScope.error = "Failed to login";
    });
  };

  $scope.resetPassword = function() {
    alert('todo!');
  };
}

controllersModule.controller('LoginCtrl', LoginCtrl);
