app.controller('PostsCtrl', function($scope, PostsSvc){

    $scope.addPost = function(){
        if ($scope.postBody){
            PostsSvc.create({
                username: 'dickeyxxx',
                body: $scope.postBody
            })
            .success(function(post){
            $scope.posts.unshift(post)
            $scope.postBody = null
        })
        }
    }

    $scope.canPost = function(){
        return $scope.currentUser
    }

	// starting data
	PostsSvc.fetch()
	.success(function(posts){
		$scope.posts=posts
	})
})