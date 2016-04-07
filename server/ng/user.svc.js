angular.module('app')
    .service('UserSvc', function($http) {

        var svc = this

        svc.getUser = function() {
            return $http.get('/api/users', {
                headers: { 'X-Auth': svc.token }
            }).then(function(response) {
                return response.data
            })
        }

        svc.login = function(username, password) {
            return $http.post('/api/sessions', {
                username: username,
                password: password
            }).then(function(response) {
                svc.token = response.data
                return svc.getUser()
            })
        }
    })
