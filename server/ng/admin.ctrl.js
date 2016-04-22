app.controller('AdminCtrl', function($scope, AdminSvc){

    $scope.deleteUser = function (user){
        AdminSvc.deleteUser(user)
        .success(function(){
            $scope.users.splice( $scope.users.indexOf(user), 1 );
        })
    }

	// starting data
	AdminSvc.getUsers()
	.success(function(users){
		$scope.users=users
	})
})