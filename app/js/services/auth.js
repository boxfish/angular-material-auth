'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function AuthService(User){
  var currentUser = {}, loggedIn;
  // Manage user roles in app
  var userRoles = [];
  var _setUser = function(user) {
    if (user !== undefined && user !== null) {
      currentUser = user;
      loggedIn = true;
    }
    else {
      currentUser = {'role': 'public'};
      loggedIn = false;
    }
  };
  var _addRole = function(role) {
    if (!_hasRole(role)) {
      userRoles.push(role);
    }
  };
  var _removeRole = function(role) {
    var idx = userRoles.indexOf(role);
    if (idx > -1) {
      userRoles.splice(idx, 1);
    }
  };
  var _hasRole = function(role) {
    return userRoles.indexOf(role) >= 0
  };

  // manage access levels
  var accessLevels = {};
  var _setAccessLevel = function(level, roles) {
    accessLevels[level] = roles;
  };

  // initialize the user
  _setUser(null);
  // TODO get the current user from local storage/cookie
  //currentUser = getUser();
  /*
  _setUser({
    email: 'test',
    role: 'user'
  });
  _setUser({
    email: 'test',
    role: 'admin'
  });
  */

  return {
    authorize: function(accessLevel, role) {
      if(role === undefined || role === null) {
        role = currentUser.role;
      }

      var rolesWithAccess = accessLevels[accessLevel];
      if (rolesWithAccess === '*') return true;
      if (rolesWithAccess.indexOf(role) >= 0) return true;
      return false;
    },
    isLoggedIn: function() {
      return loggedIn;
    },
    register: function(user, success, error) {
      alert('todo!');
    },
    logIn: function(user, success, error) {
      alert('todo!');

      var result = User.login(user, function() {
        _setUser({
          email: user.email,
          role: 'user'
        });
        success(currentUser);
      }, function() {

      });
    },
    logOut: function(success, error) {
      alert('todo!');
      _setUser(null);
      success();
    },
    getUser: function() {
      return currentUser;
    },
    setUser: function(user) {
      _setUser(user);
    },
    getRoles: function() {
      return userRoles;
    },
    addRole: function(role) {
      if (angular.isArray(role)) {
        role.forEach(function(r) {
          _addRole(r);
        });
      }
      else {
        _addRole(role);
      }
    },
    removeRole: function(role) {
      if (angular.isArray(role)) {
        role.forEach(function(r) {
          _removeRole(r);
        });
      }
      else {
        _removeRole(role);
      }
    },
    setAccessLevel: function(level, roles) {
      _setAccessLevel(level, roles);
    }
  };
}

servicesModule.service('AuthService', AuthService);
