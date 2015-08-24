'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function accessLevel() {

  return {
    restrict: 'EA',
    link: function(scope, element) {
      element.on('click', function() {
        console.log('element clicked');
      });
    }
  };

}
function accessLevel(AuthService) {
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      var prevDisp = element.css('display'), userRole, accessLevel;

      $scope.$watch(function() {
        return AuthService.getUser();
      }, function(user) {
        if(user && user.role) userRole = user.role;
        updateCSS();
      }, true);

      attrs.$observe('accessLevel', function(al) {
        accessLevel = al;
        updateCSS();
      });

      function updateCSS() {
        if(userRole && accessLevel) {
          if(!AuthService.authorize(accessLevel, userRole))
            element.css('display', 'none');
          else
            element.css('display', prevDisp);
        }
      }
    }
  };
}

directivesModule.directive('accessLevel', accessLevel);
