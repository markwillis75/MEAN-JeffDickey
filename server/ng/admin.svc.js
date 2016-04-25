angular.module('app')
.service('AdminSvc', function($http){
	this.getUsers = function(){
		return $http.get('api/adminusers')
	}

	this.deleteUser = function(user){
		var data = {"userid" : user._id }
		return $http.delete('api/adminusers', data)
	}
})