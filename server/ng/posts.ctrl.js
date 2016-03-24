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

	// starting data
	PostsSvc.fetch()
	.success(function(posts){
		$scope.posts=posts
	})
})