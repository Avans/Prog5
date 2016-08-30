(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global FFB901 */

/**
 * Step 1 - Making our own module
 * Dependencies in this Demo
 *  PointyPony : The angular module from Advans. It contains elements that we can reuse.
 * Read the docs to learn more. http://advans.herokuapp.com/#/docs
 *  ui.router  : The angular modole to help navigate from page to page. 
 * learn more on http://angular-ui.github.io/ui-router/site/#/api/ui.router
 *  ngMaterial : An Angular based framework for rendering material styled elements
 * read more on  https://material.angularjs.org/latest/
 *  ngMdIcons : An Angular based framework for showing icons
*/
var app = angular.module('Prog5', ["PointyPony", "ngMdIcons", "ui.router",  "ngMaterial"]);


/**
 * Step 2 - Referencing our online course
 * You can find your course token on advans.herokuapp.com
 */
app.constant('appConfig', {
	//Replace this token with your token from the course
	courseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IlByb2c1Ig.Lbd5e9wYohfEPkA-t_DE4SJuIIrpyKQBwHiA73dpTXQ",
});

//Make your own elements, in our case a routing config and a app controller
var routesConfig = require('./config/routes');
var appCtrl = require("./controllers/appCtrl");
var submitCtrl = require("./controllers/submitCtrl");
var reviewCtrl = require("./controllers/reviewCtrl");
var towerCtrl = require('./controllers/towerCtrl');
var sbLoad = require('./directives/sbLoad');
var twentytwenty = require('./directives/twentytwenty');
var hoverCtrl = require('./controllers/hoverCtrl');

var emailShort = require('./filters/emailshort');

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.controller('towerCtrl', towerCtrl);
app.controller('hoverCtrl', hoverCtrl);
app.controller('submitCtrl', submitCtrl);
app.controller('reviewCtrl', reviewCtrl);
app.controller('assignmentCtrl', require("./controllers/assignmentCtrl"));

app.directive('sbLoad', sbLoad);
app.directive('twentytwenty', twentytwenty);

app.filter('emailShort',  emailShort);

app.config(routesConfig);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');
});




  


},{"./config/routes":2,"./controllers/appCtrl":3,"./controllers/assignmentCtrl":4,"./controllers/hoverCtrl":5,"./controllers/reviewCtrl":6,"./controllers/submitCtrl":7,"./controllers/towerCtrl":8,"./directives/sbLoad":9,"./directives/twentytwenty":10,"./filters/emailshort":11}],2:[function(require,module,exports){
module.exports = function($stateProvider, $urlRouterProvider) {
    
    //Default route
    $urlRouterProvider.otherwise('home');
    
    //Methode voor toevoegen state, 
    //State is in camelCase
    function addState(state){
         var url = state.replace(/([a-z])([A-Z])/g, '$1/$2').toLowerCase();
         $stateProvider.state(state, {url: '/' + url, templateUrl : 'onderwerp/' + url + '.html' });
    }
    
    //Register all the routes
    $stateProvider
        
        //Default pages
        .state('home', { url: '/home',  templateUrl:'default/home.html' })
        .state('leaderboards', { url: '/leaderboards',  templateUrl:'default/leaderboards.html' })
        .state('profile', { url: '/profile',  templateUrl:'default/profile.html' })
        
        .state('opdrachten1', { url: '/opdrachten/week1', templateUrl:'opdrachten/week1.html' } )
        .state('opdrachten2', { url: '/opdrachten/week2', templateUrl:'opdrachten/week2.html' } )
        .state('opdrachten3', { url: '/opdrachten/week3', templateUrl:'opdrachten/week3.html' } )
        .state('opdrachten4', { url: '/opdrachten/week4', templateUrl:'opdrachten/week4.html' } )
        .state('opdrachten5', { url: '/opdrachten/week5', templateUrl:'opdrachten/week5.html' } )
        .state('opdrachten6', { url: '/opdrachten/week6', templateUrl:'opdrachten/week6.html' } )
        .state('opdrachtenOverview', { url: '/opdrachten/overview', templateUrl:'opdrachten/overview.html' } );

        
        //Content
        //net
        addState('netIntroductie');
        addState('netVisualstudio');
        addState('netAssemblies');
        //csharp
        addState('csharpIntroductie');
        addState('csharpProperties');
        addState('csharpLambda');
        addState('csharpLinq');
        addState('csharpGuidelines');
        //wpf
        addState('wpfIntroductie');
        addState('wpfXaml');
        addState('wpfComponenten');
        addState('wpfBinding');
        addState('wpfCommand');
        addState('wpfConvert');
        //mvvm
        addState('mvvmIntroductie');
        addState('mvvmArchitectuur');
        addState('mvvmFrameworks');
        //Mvc
        addState('efIntroductie');
        addState('efDatabase');
        addState('efEntityframework');
        addState('efDatabasefirst');

};
},{}],3:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdDialog, ppAuthService, $mdSidenav, $mdMedia, $log, $rootScope, $location, $anchorScroll, $document) {

    $(window).on('scroll', function(data, two){
		$('.scrollWidth').css('top',  $(this).scrollTop() + "px");
        
        // 		$('.scrollWith').animate({
        //     transform: 'translateY(' + $(this).scrollTop() + "px" +')'
        // });
        
	});
    
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $mdSidenav('left').close();
    });
    
     $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    
    $scope.toggleLeft = function(){
         $mdSidenav('left').toggle();
    }
    
    $scope.closeLeft = function(){
          $mdSidenav('left').close();
    }
   
    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
   }

   ppAuthService.getUser(function(user){
		if(user.error)
			return;

		$rootScope.user = user;
    });
   
   $rootScope.showDialog = function(dialogName, ev, params){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        
        $mdDialog.show({
            controller: dialogName + 'Ctrl',
            templateUrl: 'templates/dialogs/'  + dialogName +'.html',
            locals: params,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        }).then(function(result){
            if(params.cb){
                params.cb(result);
            }
        });
   }
   
  
};
},{}],4:[function(require,module,exports){
module.exports = function($scope, $mdDialog, $mdToast, ppAssignmentService, ppReviewService){
            
            $scope.assignments = [];
            
            ppAssignmentService.getAssignments(function(){
                $scope.assignments = ppAssignmentService.assignments;
            })
}
},{}],5:[function(require,module,exports){
module.exports = function($scope){
	var self = $scope;
	

	self.isShowing = true;

	self.toggle = function(){
		self.isShowing = !self.isShowing;
	}
}
},{}],6:[function(require,module,exports){
module.exports = function($scope, $mdDialog, $mdToast, ppAssignmentService, ppReviewService, assignment){
                    
    //Maybe there already is a review open
    $scope.review = assignment.myReview;
    
    
    $scope.requestSubmission = function(){
        ppReviewService.getSubmission(assignment._id, function(review){
            if(review.error == 503){
                alert("Er zijn op dit moment helaas geen submissions om te reviewen. Probeer het later nog eens!");
                $mdDialog.cancel();
            }
            $scope.review = review;
        });
    }
    
    $scope.cancelDialog = function() {
        assignment.review = $scope.review;
        ppAssignmentService.assignmentDic[assignment.name] = assignment;  
        $mdDialog.cancel();
    };
    
    $scope.submitReview = function(){
        ppReviewService.submitReview($scope.review, function(review){
            assignment.review = review;
            ppAssignmentService.assignmentDic[assignment.name] = assignment;
            $mdDialog.hide();
            $mdToast.show({
                template: '<md-toast class="md-toast success"><span flex>Review submitted! </span></md-toast>',
                hideDelay: 3000,
                parent : $document[0].querySelector('#toastBounds'),
                position: 'top right'
            });
        });
    }

    

};
},{}],7:[function(require,module,exports){
module.exports = function($scope, $mdDialog, $mdToast, ppAssignmentService, $document, assignment){
                
    $scope.submission = assignment.mySubmission;
    
    $scope.submitAssignment = function(){
        ppAssignmentService.submitAssignment(assignment._id, $scope.submission, function(){
            $mdDialog.hide();
            showSuccess();
        });
    }
            
    $scope.cancelDialog = function() {
        $mdDialog.cancel();
    };
    
    function showSuccess(){
        $mdToast.show({
                template: '<md-toast class="md-toast success"><span flex>Assignment submitted! </span></md-toast>',
                hideDelay: 3000,
                parent : $document[0].querySelector('#toastBounds'),
                position: 'top right'
            });
    }
};
},{}],8:[function(require,module,exports){
module.exports = function ($scope, $timeout, $mdSidenav, $log, $rootScope, $q) {
    var self = this;

	var ratio = 1.743;

	self.imageLocations = [
		{ src: "default/img/Background_medium.png", offset: 0.4 },
		{ src: "default/img/wolk1_medium.png", offset: 0.5, classes:"cloud" },
		{ src: "default/img/MVC_medium.png", offset: 0 },
		{ src: "default/img/WCF_medium.png", offset: 1.2 },
		{ src: "default/img/EF.png", offset: 1.4 },
		{ src: "default/img/WPF.png", offset: 1.6 },
		{ src: "default/img/wolk2_medium.png", offset: 0, classes:"cloud reeverse" },
	];

	var canvasWidth = document.getElementById('canvas').offsetWidth;
	var canvasHeight = document.getElementById('canvas').offsetHeight;
	
	$scope.ready = false;
	$scope.realHeight = (canvasWidth * ratio - canvasHeight);

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

	var preloadImages = function(images){
		  var deferred = $q.defer();
		  var count = 0;

		  images.forEach(function(img){
			$('<img>').attr({ src: img.src }).load(function() {
				count++;
				if(count == images.length){
					deferred.resolve();
				}
			});
		  });
		 
		  return deferred.promise;
	}

	preloadImages(self.imageLocations).then(function(){
		$('#loader').height(0);
		$scope.ready = true;
		$scope.toLevel(100);
	});
	
};
},{}],9:[function(require,module,exports){
module.exports = ['$parse', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        onsort: '='
      },
      link: function (scope, elem, attrs) {
        
        //subscribe
        if(!scope.$parent.elementsToLoad){
          scope.$parent.elementsToLoad = 0;
          scope.$parent.elementsLoaded = 0;
        }
        
        scope.$parent.elementsToLoad++;

        elem.on('load', function (event) {
            scope.$parent.elementsLoaded++;
           
            if(scope.$parent.elementsLoaded == scope.$parent.elementsToLoad){
                if(scope.$parent.loadingComplete)
                    scope.$parent.loadingComplete();
            }
        });
      }
    };
  }];
},{}],10:[function(require,module,exports){
module.exports = function() {
  return {
	transclude: true,
	template: "<div class='row'><div class='col-md-1'></div><div class='col-md-10'><ng-transclude></ng-transclude></div><div class='col-md-1'></div></div>",
    link: function(scope, element){
		
		//Moet met timeout dankzij bootstrap
		setTimeout(function() {
			$(element).find('.wrapper').twentytwenty();
		}, 300);
		
			
	}
  };
};
},{}],11:[function(require,module,exports){
module.exports = function() {
    return function(input) {

        return input.split('@')[0];

  }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvanMvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9ob3ZlckN0cmwuanMiLCJhcHAvanMvY29udHJvbGxlcnMvcmV2aWV3Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9zdWJtaXRDdHJsLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL3Rvd2VyQ3RybC5qcyIsImFwcC9qcy9kaXJlY3RpdmVzL3NiTG9hZC5qcyIsImFwcC9qcy9kaXJlY3RpdmVzL3R3ZW50eXR3ZW50eS5qcyIsImFwcC9qcy9maWx0ZXJzL2VtYWlsc2hvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgRkZCOTAxICovXHJcblxyXG4vKipcclxuICogU3RlcCAxIC0gTWFraW5nIG91ciBvd24gbW9kdWxlXHJcbiAqIERlcGVuZGVuY2llcyBpbiB0aGlzIERlbW9cclxuICogIFBvaW50eVBvbnkgOiBUaGUgYW5ndWxhciBtb2R1bGUgZnJvbSBBZHZhbnMuIEl0IGNvbnRhaW5zIGVsZW1lbnRzIHRoYXQgd2UgY2FuIHJldXNlLlxyXG4gKiBSZWFkIHRoZSBkb2NzIHRvIGxlYXJuIG1vcmUuIGh0dHA6Ly9hZHZhbnMuaGVyb2t1YXBwLmNvbS8jL2RvY3NcclxuICogIHVpLnJvdXRlciAgOiBUaGUgYW5ndWxhciBtb2RvbGUgdG8gaGVscCBuYXZpZ2F0ZSBmcm9tIHBhZ2UgdG8gcGFnZS4gXHJcbiAqIGxlYXJuIG1vcmUgb24gaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL3VpLXJvdXRlci9zaXRlLyMvYXBpL3VpLnJvdXRlclxyXG4gKiAgbmdNYXRlcmlhbCA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciByZW5kZXJpbmcgbWF0ZXJpYWwgc3R5bGVkIGVsZW1lbnRzXHJcbiAqIHJlYWQgbW9yZSBvbiAgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnL2xhdGVzdC9cclxuICogIG5nTWRJY29ucyA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciBzaG93aW5nIGljb25zXHJcbiovXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUHJvZzUnLCBbXCJQb2ludHlQb255XCIsIFwibmdNZEljb25zXCIsIFwidWkucm91dGVyXCIsICBcIm5nTWF0ZXJpYWxcIl0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDIgLSBSZWZlcmVuY2luZyBvdXIgb25saW5lIGNvdXJzZVxyXG4gKiBZb3UgY2FuIGZpbmQgeW91ciBjb3Vyc2UgdG9rZW4gb24gYWR2YW5zLmhlcm9rdWFwcC5jb21cclxuICovXHJcbmFwcC5jb25zdGFudCgnYXBwQ29uZmlnJywge1xyXG5cdC8vUmVwbGFjZSB0aGlzIHRva2VuIHdpdGggeW91ciB0b2tlbiBmcm9tIHRoZSBjb3Vyc2VcclxuXHRjb3Vyc2VUb2tlbjogXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuSWxCeWIyYzFJZy5MYmQ1ZTl3WW9oZkVQa0EtdF9ERTRTSnVJSXJweUtRQndIaUE3M2RwVFhRXCIsXHJcbn0pO1xyXG5cclxuLy9NYWtlIHlvdXIgb3duIGVsZW1lbnRzLCBpbiBvdXIgY2FzZSBhIHJvdXRpbmcgY29uZmlnIGFuZCBhIGFwcCBjb250cm9sbGVyXHJcbnZhciByb3V0ZXNDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMnKTtcclxudmFyIGFwcEN0cmwgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hcHBDdHJsXCIpO1xyXG52YXIgc3VibWl0Q3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3N1Ym1pdEN0cmxcIik7XHJcbnZhciByZXZpZXdDdHJsID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvcmV2aWV3Q3RybFwiKTtcclxudmFyIHRvd2VyQ3RybCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvdG93ZXJDdHJsJyk7XHJcbnZhciBzYkxvYWQgPSByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvc2JMb2FkJyk7XHJcbnZhciB0d2VudHl0d2VudHkgPSByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvdHdlbnR5dHdlbnR5Jyk7XHJcbnZhciBob3ZlckN0cmwgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2hvdmVyQ3RybCcpO1xyXG5cclxudmFyIGVtYWlsU2hvcnQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvZW1haWxzaG9ydCcpO1xyXG5cclxuLy9BZGQgdGhlIGNvbnRyb2xsZXIgYW5kIGNvbmZpZyB0byB0aGUgbW9kdWxlXHJcbmFwcC5jb250cm9sbGVyKCdhcHBDdHJsJywgYXBwQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCd0b3dlckN0cmwnLCB0b3dlckN0cmwpO1xyXG5hcHAuY29udHJvbGxlcignaG92ZXJDdHJsJywgaG92ZXJDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3N1Ym1pdEN0cmwnLCBzdWJtaXRDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3Jldmlld0N0cmwnLCByZXZpZXdDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ2Fzc2lnbm1lbnRDdHJsJywgcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXNzaWdubWVudEN0cmxcIikpO1xyXG5cclxuYXBwLmRpcmVjdGl2ZSgnc2JMb2FkJywgc2JMb2FkKTtcclxuYXBwLmRpcmVjdGl2ZSgndHdlbnR5dHdlbnR5JywgdHdlbnR5dHdlbnR5KTtcclxuXHJcbmFwcC5maWx0ZXIoJ2VtYWlsU2hvcnQnLCAgZW1haWxTaG9ydCk7XHJcblxyXG5hcHAuY29uZmlnKHJvdXRlc0NvbmZpZyk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxyXG4gICAgLmFjY2VudFBhbGV0dGUoJ2JsdWUnKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4gIFxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICBcclxuICAgIC8vRGVmYXVsdCByb3V0ZVxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnaG9tZScpO1xyXG4gICAgXHJcbiAgICAvL01ldGhvZGUgdm9vciB0b2V2b2VnZW4gc3RhdGUsIFxyXG4gICAgLy9TdGF0ZSBpcyBpbiBjYW1lbENhc2VcclxuICAgIGZ1bmN0aW9uIGFkZFN0YXRlKHN0YXRlKXtcclxuICAgICAgICAgdmFyIHVybCA9IHN0YXRlLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS8kMicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKHN0YXRlLCB7dXJsOiAnLycgKyB1cmwsIHRlbXBsYXRlVXJsIDogJ29uZGVyd2VycC8nICsgdXJsICsgJy5odG1sJyB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9SZWdpc3RlciBhbGwgdGhlIHJvdXRlc1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICBcclxuICAgICAgICAvL0RlZmF1bHQgcGFnZXNcclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7IHVybDogJy9ob21lJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2hvbWUuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ2xlYWRlcmJvYXJkcycsIHsgdXJsOiAnL2xlYWRlcmJvYXJkcycsICB0ZW1wbGF0ZVVybDonZGVmYXVsdC9sZWFkZXJib2FyZHMuaHRtbCcgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpbGUnLCB7IHVybDogJy9wcm9maWxlJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L3Byb2ZpbGUuaHRtbCcgfSlcclxuICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4xJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMScsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWsxLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjInLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsyJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazIuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazMnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMy5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW40JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNCcsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs0Lmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjUnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs1JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazUuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazYnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNi5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW5PdmVydmlldycsIHsgdXJsOiAnL29wZHJhY2h0ZW4vb3ZlcnZpZXcnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi9vdmVydmlldy5odG1sJyB9ICk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vQ29udGVudFxyXG4gICAgICAgIC8vbmV0XHJcbiAgICAgICAgYWRkU3RhdGUoJ25ldEludHJvZHVjdGllJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ25ldFZpc3VhbHN0dWRpbycpO1xyXG4gICAgICAgIGFkZFN0YXRlKCduZXRBc3NlbWJsaWVzJyk7XHJcbiAgICAgICAgLy9jc2hhcnBcclxuICAgICAgICBhZGRTdGF0ZSgnY3NoYXJwSW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnY3NoYXJwUHJvcGVydGllcycpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBMYW1iZGEnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnY3NoYXJwTGlucScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBHdWlkZWxpbmVzJyk7XHJcbiAgICAgICAgLy93cGZcclxuICAgICAgICBhZGRTdGF0ZSgnd3BmSW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd3BmWGFtbCcpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZDb21wb25lbnRlbicpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZCaW5kaW5nJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3dwZkNvbW1hbmQnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd3BmQ29udmVydCcpO1xyXG4gICAgICAgIC8vbXZ2bVxyXG4gICAgICAgIGFkZFN0YXRlKCdtdnZtSW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnbXZ2bUFyY2hpdGVjdHV1cicpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdnZtRnJhbWV3b3JrcycpO1xyXG4gICAgICAgIC8vTXZjXHJcbiAgICAgICAgYWRkU3RhdGUoJ2VmSW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnZWZEYXRhYmFzZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdlZkVudGl0eWZyYW1ld29yaycpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdlZkRhdGFiYXNlZmlyc3QnKTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kRGlhbG9nLCBwcEF1dGhTZXJ2aWNlLCAkbWRTaWRlbmF2LCAkbWRNZWRpYSwgJGxvZywgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkYW5jaG9yU2Nyb2xsLCAkZG9jdW1lbnQpIHtcclxuXHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGRhdGEsIHR3byl7XHJcblx0XHQkKCcuc2Nyb2xsV2lkdGgnKS5jc3MoJ3RvcCcsICAkKHRoaXMpLnNjcm9sbFRvcCgpICsgXCJweFwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBcdFx0JCgnLnNjcm9sbFdpdGgnKS5hbmltYXRlKHtcclxuICAgICAgICAvLyAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgnICsgJCh0aGlzKS5zY3JvbGxUb3AoKSArIFwicHhcIiArJyknXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgXHJcblx0fSk7XHJcbiAgICBcclxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGUsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICRzY29wZS50b2dnbGVMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkc2NvcGUuY2xvc2VMZWZ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICBcclxuICAgICRzY29wZS5zY3JvbGxUbyA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdmFyIG9sZCA9ICRsb2NhdGlvbi5oYXNoKCk7XHJcbiAgICAgICAgJGxvY2F0aW9uLmhhc2goaWQpO1xyXG4gICAgICAgICRhbmNob3JTY3JvbGwoKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChvbGQpO1xyXG4gICB9XHJcblxyXG4gICBwcEF1dGhTZXJ2aWNlLmdldFVzZXIoZnVuY3Rpb24odXNlcil7XHJcblx0XHRpZih1c2VyLmVycm9yKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0JHJvb3RTY29wZS51c2VyID0gdXNlcjtcclxuICAgIH0pO1xyXG4gICBcclxuICAgJHJvb3RTY29wZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oZGlhbG9nTmFtZSwgZXYsIHBhcmFtcyl7XHJcbiAgICAgICAgdmFyIHVzZUZ1bGxTY3JlZW4gPSAoJG1kTWVkaWEoJ3NtJykgfHwgJG1kTWVkaWEoJ3hzJykpICAmJiAkc2NvcGUuY3VzdG9tRnVsbHNjcmVlbjtcclxuICAgICAgICBcclxuICAgICAgICAkbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGRpYWxvZ05hbWUgKyAnQ3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2RpYWxvZ3MvJyAgKyBkaWFsb2dOYW1lICsnLmh0bWwnLFxyXG4gICAgICAgICAgICBsb2NhbHM6IHBhcmFtcyxcclxuICAgICAgICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXHJcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiBldixcclxuICAgICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTp0cnVlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB1c2VGdWxsU2NyZWVuXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICBpZihwYXJhbXMuY2Ipe1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgfVxyXG4gICBcclxuICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzY29wZSwgJG1kRGlhbG9nLCAkbWRUb2FzdCwgcHBBc3NpZ25tZW50U2VydmljZSwgcHBSZXZpZXdTZXJ2aWNlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzY29wZS5hc3NpZ25tZW50cyA9IFtdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcHBBc3NpZ25tZW50U2VydmljZS5nZXRBc3NpZ25tZW50cyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmFzc2lnbm1lbnRzID0gcHBBc3NpZ25tZW50U2VydmljZS5hc3NpZ25tZW50cztcclxuICAgICAgICAgICAgfSlcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlKXtcclxuXHR2YXIgc2VsZiA9ICRzY29wZTtcclxuXHRcclxuXHJcblx0c2VsZi5pc1Nob3dpbmcgPSB0cnVlO1xyXG5cclxuXHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRzZWxmLmlzU2hvd2luZyA9ICFzZWxmLmlzU2hvd2luZztcclxuXHR9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzY29wZSwgJG1kRGlhbG9nLCAkbWRUb2FzdCwgcHBBc3NpZ25tZW50U2VydmljZSwgcHBSZXZpZXdTZXJ2aWNlLCBhc3NpZ25tZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vTWF5YmUgdGhlcmUgYWxyZWFkeSBpcyBhIHJldmlldyBvcGVuXHJcbiAgICAkc2NvcGUucmV2aWV3ID0gYXNzaWdubWVudC5teVJldmlldztcclxuICAgIFxyXG4gICAgXHJcbiAgICAkc2NvcGUucmVxdWVzdFN1Ym1pc3Npb24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBwUmV2aWV3U2VydmljZS5nZXRTdWJtaXNzaW9uKGFzc2lnbm1lbnQuX2lkLCBmdW5jdGlvbihyZXZpZXcpe1xyXG4gICAgICAgICAgICBpZihyZXZpZXcuZXJyb3IgPT0gNTAzKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXIgemlqbiBvcCBkaXQgbW9tZW50IGhlbGFhcyBnZWVuIHN1Ym1pc3Npb25zIG9tIHRlIHJldmlld2VuLiBQcm9iZWVyIGhldCBsYXRlciBub2cgZWVucyFcIik7XHJcbiAgICAgICAgICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLnJldmlldyA9IHJldmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLmNhbmNlbERpYWxvZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFzc2lnbm1lbnQucmV2aWV3ID0gJHNjb3BlLnJldmlldztcclxuICAgICAgICBwcEFzc2lnbm1lbnRTZXJ2aWNlLmFzc2lnbm1lbnREaWNbYXNzaWdubWVudC5uYW1lXSA9IGFzc2lnbm1lbnQ7ICBcclxuICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAkc2NvcGUuc3VibWl0UmV2aWV3ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBwcFJldmlld1NlcnZpY2Uuc3VibWl0UmV2aWV3KCRzY29wZS5yZXZpZXcsIGZ1bmN0aW9uKHJldmlldyl7XHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnQucmV2aWV3ID0gcmV2aWV3O1xyXG4gICAgICAgICAgICBwcEFzc2lnbm1lbnRTZXJ2aWNlLmFzc2lnbm1lbnREaWNbYXNzaWdubWVudC5uYW1lXSA9IGFzc2lnbm1lbnQ7XHJcbiAgICAgICAgICAgICRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICAgICAgICAgICRtZFRvYXN0LnNob3coe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICc8bWQtdG9hc3QgY2xhc3M9XCJtZC10b2FzdCBzdWNjZXNzXCI+PHNwYW4gZmxleD5SZXZpZXcgc3VibWl0dGVkISA8L3NwYW4+PC9tZC10b2FzdD4nLFxyXG4gICAgICAgICAgICAgICAgaGlkZURlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50IDogJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyN0b2FzdEJvdW5kcycpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AgcmlnaHQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzY29wZSwgJG1kRGlhbG9nLCAkbWRUb2FzdCwgcHBBc3NpZ25tZW50U2VydmljZSwgJGRvY3VtZW50LCBhc3NpZ25tZW50KXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgJHNjb3BlLnN1Ym1pc3Npb24gPSBhc3NpZ25tZW50Lm15U3VibWlzc2lvbjtcclxuICAgIFxyXG4gICAgJHNjb3BlLnN1Ym1pdEFzc2lnbm1lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBwQXNzaWdubWVudFNlcnZpY2Uuc3VibWl0QXNzaWdubWVudChhc3NpZ25tZW50Ll9pZCwgJHNjb3BlLnN1Ym1pc3Npb24sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICAgICAgICAgIHNob3dTdWNjZXNzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgJHNjb3BlLmNhbmNlbERpYWxvZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNob3dTdWNjZXNzKCl7XHJcbiAgICAgICAgJG1kVG9hc3Quc2hvdyh7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxtZC10b2FzdCBjbGFzcz1cIm1kLXRvYXN0IHN1Y2Nlc3NcIj48c3BhbiBmbGV4PkFzc2lnbm1lbnQgc3VibWl0dGVkISA8L3NwYW4+PC9tZC10b2FzdD4nLFxyXG4gICAgICAgICAgICAgICAgaGlkZURlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50IDogJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyN0b2FzdEJvdW5kcycpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AgcmlnaHQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUsICRxKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHZhciByYXRpbyA9IDEuNzQzO1xyXG5cclxuXHRzZWxmLmltYWdlTG9jYXRpb25zID0gW1xyXG5cdFx0eyBzcmM6IFwiZGVmYXVsdC9pbWcvQmFja2dyb3VuZF9tZWRpdW0ucG5nXCIsIG9mZnNldDogMC40IH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy93b2xrMV9tZWRpdW0ucG5nXCIsIG9mZnNldDogMC41LCBjbGFzc2VzOlwiY2xvdWRcIiB9LFxyXG5cdFx0eyBzcmM6IFwiZGVmYXVsdC9pbWcvTVZDX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwIH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9XQ0ZfbWVkaXVtLnBuZ1wiLCBvZmZzZXQ6IDEuMiB9LFxyXG5cdFx0eyBzcmM6IFwiZGVmYXVsdC9pbWcvRUYucG5nXCIsIG9mZnNldDogMS40IH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9XUEYucG5nXCIsIG9mZnNldDogMS42IH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy93b2xrMl9tZWRpdW0ucG5nXCIsIG9mZnNldDogMCwgY2xhc3NlczpcImNsb3VkIHJlZXZlcnNlXCIgfSxcclxuXHRdO1xyXG5cclxuXHR2YXIgY2FudmFzV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0V2lkdGg7XHJcblx0dmFyIGNhbnZhc0hlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRIZWlnaHQ7XHJcblx0XHJcblx0JHNjb3BlLnJlYWR5ID0gZmFsc2U7XHJcblx0JHNjb3BlLnJlYWxIZWlnaHQgPSAoY2FudmFzV2lkdGggKiByYXRpbyAtIGNhbnZhc0hlaWdodCk7XHJcblxyXG5cdCRzY29wZS50b0xldmVsID0gZnVuY3Rpb24obmV3TGV2ZWwpe1xyXG5cdFx0JHNjb3BlLmxldmVsID0gJHNjb3BlLnJlYWxIZWlnaHQgLyAxMDAgKiBuZXdMZXZlbDtcclxuXHR9XHJcblx0XHJcblx0JHNjb3BlLmlzTmVhciA9IGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdGlmKCEkc2NvcGUucmVhZHkpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHJcblx0XHR2YWx1ZSA9ICAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIHZhbHVlO1xyXG5cdFx0cmV0dXJuICRzY29wZS5sZXZlbCA8ICh2YWx1ZSArIDEwMCkgJiYgJHNjb3BlLmxldmVsID4gKHZhbHVlIC0gMTAwKTtcclxuXHR9O1xyXG5cdFxyXG5cdCRzY29wZS5nZXRTcmNzZXQgPSBmdW5jdGlvbihpbWcpe1xyXG5cdFx0XHJcblx0XHR2YXIgcm9vdCA9IFwiZGVmYXVsdC9pbWcvXCI7XHJcblx0XHRyZXR1cm4gcm9vdCArIGltZyArIFwiX3NtYWxsLnBuZyA2MDB3LCBcIiArIHJvb3QgKyBpbWcgKyBcIl9tZWRpdW0ucG5nIDkwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX2xhcmdlLnBuZyAxMjAwd1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIHByZWxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpe1xyXG5cdFx0ICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cdFx0ICB2YXIgY291bnQgPSAwO1xyXG5cclxuXHRcdCAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1nKXtcclxuXHRcdFx0JCgnPGltZz4nKS5hdHRyKHsgc3JjOiBpbWcuc3JjIH0pLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0XHRpZihjb3VudCA9PSBpbWFnZXMubGVuZ3RoKXtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0ICB9KTtcclxuXHRcdCBcclxuXHRcdCAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkSW1hZ2VzKHNlbGYuaW1hZ2VMb2NhdGlvbnMpLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNsb2FkZXInKS5oZWlnaHQoMCk7XHJcblx0XHQkc2NvcGUucmVhZHkgPSB0cnVlO1xyXG5cdFx0JHNjb3BlLnRvTGV2ZWwoMTAwKTtcclxuXHR9KTtcclxuXHRcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHBhcnNlJywgZnVuY3Rpb24gKCRwYXJzZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgc2NvcGU6IHtcclxuICAgICAgICBvbnNvcnQ6ICc9J1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zdWJzY3JpYmVcclxuICAgICAgICBpZighc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkID0gMDtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKys7XHJcblxyXG4gICAgICAgIGVsZW0ub24oJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCsrO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkID09IHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuJHBhcmVudC5sb2FkaW5nQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5sb2FkaW5nQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1dOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuXHR0cmFuc2NsdWRlOiB0cnVlLFxyXG5cdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J3Jvdyc+PGRpdiBjbGFzcz0nY29sLW1kLTEnPjwvZGl2PjxkaXYgY2xhc3M9J2NvbC1tZC0xMCc+PG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPjwvZGl2PjxkaXYgY2xhc3M9J2NvbC1tZC0xJz48L2Rpdj48L2Rpdj5cIixcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KXtcclxuXHRcdFxyXG5cdFx0Ly9Nb2V0IG1ldCB0aW1lb3V0IGRhbmt6aWogYm9vdHN0cmFwXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKGVsZW1lbnQpLmZpbmQoJy53cmFwcGVyJykudHdlbnR5dHdlbnR5KCk7XHJcblx0XHR9LCAzMDApO1xyXG5cdFx0XHJcblx0XHRcdFxyXG5cdH1cclxuICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnNwbGl0KCdAJylbMF07XHJcblxyXG4gIH1cclxufSJdfQ==
