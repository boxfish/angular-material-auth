'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, $state, AppSettings, AuthService) {
  // set up the roles and access levels
  AuthService.addRole(['public', 'user', 'admin']);
  AuthService.setAccessLevel('public', '*');
  AuthService.setAccessLevel('anon', ['public']);
  AuthService.setAccessLevel('user', ['user', 'admin']);
  AuthService.setAccessLevel('admin', ['admin']);

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    if(!('data' in toState) || !('access' in toState.data)){
      $rootScope.error = "Access undefined for this state";
      event.preventDefault();
    }
    else if (!AuthService.authorize(toState.data.access)) {
      $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
      event.preventDefault();

      if(fromState.url === '^') {
        if(AuthService.isLoggedIn()) {
          $state.go('user.home');
        } else {
          $rootScope.error = null;
          $state.go('anon.login');
        }
      }
    }
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });
}

module.exports = OnRun;
