module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope) {
    
	var ratio = 1.743;
	
	var canvasWidth = document.getElementById('canvas').offsetWidth;
	var canvasHeight = document.getElementById('canvas').offsetHeight;
	
	$scope.ready = false;
	$scope.realHeight = (canvasWidth * ratio - canvasHeight);

	$scope.loadingComplete = function(){
		$('#loader').height(0);
		$scope.ready = true;
		$scope.toLevel(100);
	}
	

	$scope.toLevel = function(newLevel){
		$scope.level = $scope.realHeight / 100 * newLevel;
	}
	
	$scope.isNear = function(value){
		if(!$scope.ready)
			return false;
			
		value =  $scope.realHeight / 100 * value;
		return $scope.level < (value + 100) && $scope.level > (value - 100);
	};
	
	$scope.getSrcset = function(img){
		
		var root = "default/img/";
		return root + img + "_small.png 600w, " + root + img + "_medium.png 900w, " + root + img + "_large.png 1200w";
	}
};