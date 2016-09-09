module.exports = function($scope, $mdDialog, $mdToast, ppFeedbackService){
	
	
    $scope.feeling = null;

	$scope.sendFeedback = function(){

	
		var feedback = {
			feeling: $scope.feeling, 
			description: $scope.description
		};

		ppFeedbackService.postFeedback(feedback, function(result){
			$mdDialog.cancel();
            if(result.msg == "success"){
                $mdToast.show({
                    template: '<md-toast class="md-toast success"><span flex>Feedback submitted! </span></md-toast>',
                    hideDelay: 3000,
                    parent : $document[0].querySelector('#toastBounds'),
                    position: 'top right'
                });
            }
            else{
                $mdToast.show({
                    template: '<md-toast class="md-toast warning"><span flex>Something went wront :( </span></md-toast>',
                    hideDelay: 3000,
                    parent : $document[0].querySelector('#toastBounds'),
                    position: 'top right'
                });
            }
		})

	};

    $scope.cancelDialog = function() {
        $mdDialog.cancel();
    };

}