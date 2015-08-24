'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,
  $mdThemingProvider, $mdIconProvider,
  AppSettings, LoopBackResourceProvider) {
  // Public routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'public-base.html',
      data: {
        access: 'public'
      }
    })
    .state('public.404', {
      url: '/404/',
      templateUrl: '404.html'
    });

  // Anonymous routes
  $stateProvider
    .state('anon', {
      abstract: true,
      templateUrl: 'anon-base.html',
      data: {
        access: 'anon'
      }
    })
    .state('anon.login', {
      url: '/login/',
      templateUrl: 'login.html',
      controller: 'LoginCtrl',
      title: 'Sign In'
    })
    .state('anon.register', {
      url: '/register/',
      templateUrl: 'register.html',
      controller: 'RegisterCtrl',
      title: 'Register'
    });

  // Regular user routes
  $stateProvider
    .state('user', {
        abstract: true,
        templateUrl: 'user-base.html',
        data: {
          access: 'user'
        }
    })
    .state('user.home', {
        url: '/',
        templateUrl: 'home.html'
    });

  // Admin routes
  $stateProvider
    .state('admin', {
      abstract: true,
      templateUrl: 'admin-base.html',
      data: {
        access: 'admin'
      }
    })
    .state('admin.home', {
      url: '/admin/',
      templateUrl: 'admin.html'
    });

  $urlRouterProvider.otherwise('/404');

  // Allow for optional trailing slashes.
  // Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
  $urlRouterProvider.rule(function($injector, $location) {
      if($location.protocol() === 'file') return;

      var path = $location.path(),
        search = $location.search(),
        params;

      // check to see if the path already ends in '/'
      if (path[path.length - 1] === '/') return;

      // If there was no search string / query params, return with a `/`
      if (Object.keys(search).length === 0) return path + '/';

      // Otherwise build the search string and return a `/?` prefix
      params = [];
      angular.forEach(search, function(v, k){
        params.push(k + '=' + v);
      });
      return path + '/?' + params.join('&');
  });

  //$locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(function($q, $location) {
    return {
      'responseError': function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  });

  /*
  $mdIconProvider.defaultIconSet("./assets/svg/avatars.svg", 128)
    .icon("menu"       , "./assets/svg/menu.svg"        , 24)
    .icon("share"      , "./assets/svg/share.svg"       , 24)
    .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
    .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
    .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
    .icon("phone"      , "./assets/svg/phone.svg"       , 512);
  */
  $mdThemingProvider.definePalette("my-blue", $mdThemingProvider.extendPalette("blue", {
      50: "#DCEFFF",
      100: "#AAD1F9",
      200: "#7BB8F5",
      300: "#4C9EF1",
      400: "#1C85ED",
      500: "#106CC8",
      600: "#0159A2",
      700: "#025EE9",
      800: "#014AB6",
      900: "#013583",
      contrastDefaultColor: "light",
      contrastDarkColors: "50 100 200 A100",
      contrastStrongLightColors: "300 400 A200 A400"
  }));
  $mdThemingProvider.definePalette("my-red", $mdThemingProvider.extendPalette("red", {
      A100: "#DE3641"
  }));
  $mdThemingProvider.theme("default")
    .primaryPalette("my-blue")
    .accentPalette("my-red");


  LoopBackResourceProvider.setUrlBase(AppSettings.apiBaseUrl);
}

module.exports = OnConfig;
