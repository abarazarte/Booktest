(function(){
  /**
   * @ngdoc service
   * @name clientApp.authenticationService
   * @description
   * # authenticationService
   * Service in the clientApp.
   */
  angular.module('clientApp')
    .service('authenticationService', authServiceFn);

  function authServiceFn($rootScope, $q, $http, store, API_BASE_PATH){
    return {
      authenticate: authenticateFn,
      clearCredentials: clearCredentialsFn
      // recoverPassword: recoverPasswordFn,

    };

    function saveCredentialsFn(token){
      store.set('client_token', token);
    }

    function clearCredentialsFn(){
      store.remove('client_token');
    }

    function authenticateFn(username, password){
      return $http({
        url: API_BASE_PATH + 'auth/login',
        method: 'GET',
        headers: {
          'Authorization' : 'Basic ' + base64Encode(username + ':' + password)
        },
        ignoreAuthModule: true
      }).then(function(response){
        clearCredentialsFn();
        saveCredentialsFn(response.data);
      }, function(error){
        return $q.reject(error);
      })
    }

    function recoverPasswordFn(email){
      return $http.get(API_BASE_PATH + 'drivers/password/reset?email=' + email)
        .then(function(data) {
          return data;
        }, function(error) {
          return error;
        });
    }

    function base64Encode(input) {
      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);

      return output;
    }

  }
})();
