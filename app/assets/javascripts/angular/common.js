'use strict';

angular.module('commonLib', []);

angular.module('commonLib')
  .factory('common', ['$http', '$q', function($http, $q) {
    return {
      ajaxCall: function(method, url, params, cache) {
        var def = $q.defer();
        $http({method: method, url: url, data: params, cache: cache})
          .success(function(res) {
            def.resolve(res);
          })
          .error(function(err) {
            def.reject(err);
          })
        return def.promise;
      }
    }}
  ])

/*
 * Default config for $http
 * Data Type: json
 * Always send csrf token
*/
window.defaultConfig = function($httpProvider, $locationProvider) {
  var csrfTokenElm = document.getElementsByName('csrf-token'),
      csrfToken = csrfTokenElm[0] ? csrfTokenElm[0].content : '';
  $httpProvider.defaults.headers.common.Accept = 'application/json';
  $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrfToken;
  $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrfToken;
  $httpProvider.defaults.headers.delete = {'X-CSRF-Token': csrfToken};

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
    rewriteLinks: false //disables url rewriting for relative links
  });
}
