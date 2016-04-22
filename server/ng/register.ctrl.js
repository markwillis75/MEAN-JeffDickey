angular.module('app')
    .controller('RegisterCtrl', function($scope, UserSvc) {
    	$scope.register = function(username, password, passwordConfirm){
    		if (username && password && passwordConfirm && (password === passwordConfirm)){
    			UserSvc.registerUser(username, password)
    			.then(function(user){
    				$scope.$emit('login', user);
    			});
    		}
    	};

    	$scope.detailsValid = function(){
    		return $scope.username &&
    		       $scope.password &&
    		       $scope.passwordConfirm &&
    		       $scope.password === $scope.passwordConfirm;
    	};
    });
