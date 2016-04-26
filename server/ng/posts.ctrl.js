app.controller('PostsCtrl', function($scope, PostsSvc){

    $scope.addPost = function(){
        if ($scope.postBody){
            PostsSvc.create({
                username: 'dickeyxxx',
                body: $scope.postBody
            })
            .success(function(post){
            $scope.postBody = null
        })
        }
    }

    $scope.canPost = function(){
        return $scope.currentUser
    }

    $scope.$on('ws:new_post', function(_, post){
        $scope.$apply(function(){
            $scope.posts.unshift(post)
        })
    })

	// starting data
	PostsSvc.fetch()
	.success(function(posts){
		$scope.posts=posts
	})
})