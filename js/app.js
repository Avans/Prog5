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

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.controller('towerCtrl', towerCtrl);
app.controller('hoverCtrl', hoverCtrl);
app.controller('submitCtrl', submitCtrl);
app.controller('reviewCtrl', reviewCtrl);
app.controller('assignmentCtrl', require("./controllers/assignmentCtrl"));

app.directive('sbLoad', sbLoad);
app.directive('twentytwenty', twentytwenty);

app.config(routesConfig);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');
});




  


},{"./config/routes":2,"./controllers/appCtrl":3,"./controllers/assignmentCtrl":4,"./controllers/hoverCtrl":5,"./controllers/reviewCtrl":6,"./controllers/submitCtrl":7,"./controllers/towerCtrl":8,"./directives/sbLoad":9,"./directives/twentytwenty":10}],2:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvanMvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9ob3ZlckN0cmwuanMiLCJhcHAvanMvY29udHJvbGxlcnMvcmV2aWV3Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9zdWJtaXRDdHJsLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL3Rvd2VyQ3RybC5qcyIsImFwcC9qcy9kaXJlY3RpdmVzL3NiTG9hZC5qcyIsImFwcC9qcy9kaXJlY3RpdmVzL3R3ZW50eXR3ZW50eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgRkZCOTAxICovXHJcblxyXG4vKipcclxuICogU3RlcCAxIC0gTWFraW5nIG91ciBvd24gbW9kdWxlXHJcbiAqIERlcGVuZGVuY2llcyBpbiB0aGlzIERlbW9cclxuICogIFBvaW50eVBvbnkgOiBUaGUgYW5ndWxhciBtb2R1bGUgZnJvbSBBZHZhbnMuIEl0IGNvbnRhaW5zIGVsZW1lbnRzIHRoYXQgd2UgY2FuIHJldXNlLlxyXG4gKiBSZWFkIHRoZSBkb2NzIHRvIGxlYXJuIG1vcmUuIGh0dHA6Ly9hZHZhbnMuaGVyb2t1YXBwLmNvbS8jL2RvY3NcclxuICogIHVpLnJvdXRlciAgOiBUaGUgYW5ndWxhciBtb2RvbGUgdG8gaGVscCBuYXZpZ2F0ZSBmcm9tIHBhZ2UgdG8gcGFnZS4gXHJcbiAqIGxlYXJuIG1vcmUgb24gaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL3VpLXJvdXRlci9zaXRlLyMvYXBpL3VpLnJvdXRlclxyXG4gKiAgbmdNYXRlcmlhbCA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciByZW5kZXJpbmcgbWF0ZXJpYWwgc3R5bGVkIGVsZW1lbnRzXHJcbiAqIHJlYWQgbW9yZSBvbiAgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnL2xhdGVzdC9cclxuICogIG5nTWRJY29ucyA6IEFuIEFuZ3VsYXIgYmFzZWQgZnJhbWV3b3JrIGZvciBzaG93aW5nIGljb25zXHJcbiovXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUHJvZzUnLCBbXCJQb2ludHlQb255XCIsIFwibmdNZEljb25zXCIsIFwidWkucm91dGVyXCIsICBcIm5nTWF0ZXJpYWxcIl0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGVwIDIgLSBSZWZlcmVuY2luZyBvdXIgb25saW5lIGNvdXJzZVxyXG4gKiBZb3UgY2FuIGZpbmQgeW91ciBjb3Vyc2UgdG9rZW4gb24gYWR2YW5zLmhlcm9rdWFwcC5jb21cclxuICovXHJcbmFwcC5jb25zdGFudCgnYXBwQ29uZmlnJywge1xyXG5cdC8vUmVwbGFjZSB0aGlzIHRva2VuIHdpdGggeW91ciB0b2tlbiBmcm9tIHRoZSBjb3Vyc2VcclxuXHRjb3Vyc2VUb2tlbjogXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuSWxCeWIyYzFJZy5MYmQ1ZTl3WW9oZkVQa0EtdF9ERTRTSnVJSXJweUtRQndIaUE3M2RwVFhRXCIsXHJcbn0pO1xyXG5cclxuLy9NYWtlIHlvdXIgb3duIGVsZW1lbnRzLCBpbiBvdXIgY2FzZSBhIHJvdXRpbmcgY29uZmlnIGFuZCBhIGFwcCBjb250cm9sbGVyXHJcbnZhciByb3V0ZXNDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9yb3V0ZXMnKTtcclxudmFyIGFwcEN0cmwgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hcHBDdHJsXCIpO1xyXG52YXIgc3VibWl0Q3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3N1Ym1pdEN0cmxcIik7XHJcbnZhciByZXZpZXdDdHJsID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvcmV2aWV3Q3RybFwiKTtcclxudmFyIHRvd2VyQ3RybCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvdG93ZXJDdHJsJyk7XHJcbnZhciBzYkxvYWQgPSByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvc2JMb2FkJyk7XHJcbnZhciB0d2VudHl0d2VudHkgPSByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvdHdlbnR5dHdlbnR5Jyk7XHJcbnZhciBob3ZlckN0cmwgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2hvdmVyQ3RybCcpO1xyXG5cclxuLy9BZGQgdGhlIGNvbnRyb2xsZXIgYW5kIGNvbmZpZyB0byB0aGUgbW9kdWxlXHJcbmFwcC5jb250cm9sbGVyKCdhcHBDdHJsJywgYXBwQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCd0b3dlckN0cmwnLCB0b3dlckN0cmwpO1xyXG5hcHAuY29udHJvbGxlcignaG92ZXJDdHJsJywgaG92ZXJDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3N1Ym1pdEN0cmwnLCBzdWJtaXRDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3Jldmlld0N0cmwnLCByZXZpZXdDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ2Fzc2lnbm1lbnRDdHJsJywgcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXNzaWdubWVudEN0cmxcIikpO1xyXG5cclxuYXBwLmRpcmVjdGl2ZSgnc2JMb2FkJywgc2JMb2FkKTtcclxuYXBwLmRpcmVjdGl2ZSgndHdlbnR5dHdlbnR5JywgdHdlbnR5dHdlbnR5KTtcclxuXHJcbmFwcC5jb25maWcocm91dGVzQ29uZmlnKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAuYWNjZW50UGFsZXR0ZSgnYmx1ZScpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiAgXHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIFxyXG4gICAgLy9EZWZhdWx0IHJvdXRlXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdob21lJyk7XHJcbiAgICBcclxuICAgIC8vTWV0aG9kZSB2b29yIHRvZXZvZWdlbiBzdGF0ZSwgXHJcbiAgICAvL1N0YXRlIGlzIGluIGNhbWVsQ2FzZVxyXG4gICAgZnVuY3Rpb24gYWRkU3RhdGUoc3RhdGUpe1xyXG4gICAgICAgICB2YXIgdXJsID0gc3RhdGUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLyQyJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoc3RhdGUsIHt1cmw6ICcvJyArIHVybCwgdGVtcGxhdGVVcmwgOiAnb25kZXJ3ZXJwLycgKyB1cmwgKyAnLmh0bWwnIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1JlZ2lzdGVyIGFsbCB0aGUgcm91dGVzXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjEnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsxJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazEuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazInLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMi5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4zJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMycsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWszLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjQnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs0JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazQuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNScsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazUnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNS5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW42JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNicsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs2Lmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbk92ZXJ2aWV3JywgeyB1cmw6ICcvb3BkcmFjaHRlbi9vdmVydmlldycsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL292ZXJ2aWV3Lmh0bWwnIH0gKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Db250ZW50XHJcbiAgICAgICAgLy9uZXRcclxuICAgICAgICBhZGRTdGF0ZSgnbmV0SW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnbmV0VmlzdWFsc3R1ZGlvJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ25ldEFzc2VtYmxpZXMnKTtcclxuICAgICAgICAvL2NzaGFycFxyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBQcm9wZXJ0aWVzJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2NzaGFycExhbWJkYScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBMaW5xJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2NzaGFycEd1aWRlbGluZXMnKTtcclxuICAgICAgICAvL3dwZlxyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZYYW1sJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3dwZkNvbXBvbmVudGVuJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3dwZkJpbmRpbmcnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd3BmQ29tbWFuZCcpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZDb252ZXJ0Jyk7XHJcbiAgICAgICAgLy9tdnZtXHJcbiAgICAgICAgYWRkU3RhdGUoJ212dm1JbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdnZtQXJjaGl0ZWN0dXVyJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ212dm1GcmFtZXdvcmtzJyk7XHJcbiAgICAgICAgLy9NdmNcclxuICAgICAgICBhZGRTdGF0ZSgnZWZJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdlZkRhdGFiYXNlJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2VmRW50aXR5ZnJhbWV3b3JrJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2VmRGF0YWJhc2VmaXJzdCcpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICR0aW1lb3V0LCAkbWREaWFsb2csIHBwQXV0aFNlcnZpY2UsICRtZFNpZGVuYXYsICRtZE1lZGlhLCAkbG9nLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRhbmNob3JTY3JvbGwsICRkb2N1bWVudCkge1xyXG5cclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZGF0YSwgdHdvKXtcclxuXHRcdCQoJy5zY3JvbGxXaWR0aCcpLmNzcygndG9wJywgICQodGhpcykuc2Nyb2xsVG9wKCkgKyBcInB4XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFx0XHQkKCcuc2Nyb2xsV2l0aCcpLmFuaW1hdGUoe1xyXG4gICAgICAgIC8vICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAkKHRoaXMpLnNjcm9sbFRvcCgpICsgXCJweFwiICsnKSdcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBcclxuXHR9KTtcclxuICAgIFxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDA7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICRzY29wZS5jbG9zZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgJHNjb3BlLnNjcm9sbFRvID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICB2YXIgb2xkID0gJGxvY2F0aW9uLmhhc2goKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChpZCk7XHJcbiAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICRsb2NhdGlvbi5oYXNoKG9sZCk7XHJcbiAgIH1cclxuXHJcbiAgIHBwQXV0aFNlcnZpY2UuZ2V0VXNlcihmdW5jdGlvbih1c2VyKXtcclxuXHRcdGlmKHVzZXIuZXJyb3IpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHQkcm9vdFNjb3BlLnVzZXIgPSB1c2VyO1xyXG4gICAgfSk7XHJcbiAgIFxyXG4gICAkcm9vdFNjb3BlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihkaWFsb2dOYW1lLCBldiwgcGFyYW1zKXtcclxuICAgICAgICB2YXIgdXNlRnVsbFNjcmVlbiA9ICgkbWRNZWRpYSgnc20nKSB8fCAkbWRNZWRpYSgneHMnKSkgICYmICRzY29wZS5jdXN0b21GdWxsc2NyZWVuO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRtZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogZGlhbG9nTmFtZSArICdDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvZGlhbG9ncy8nICArIGRpYWxvZ05hbWUgKycuaHRtbCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOnRydWUsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHVzZUZ1bGxTY3JlZW5cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtcy5jYil7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICB9XHJcbiAgIFxyXG4gIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlLCAkbWREaWFsb2csICRtZFRvYXN0LCBwcEFzc2lnbm1lbnRTZXJ2aWNlLCBwcFJldmlld1NlcnZpY2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLmFzc2lnbm1lbnRzID0gW107XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcEFzc2lnbm1lbnRTZXJ2aWNlLmdldEFzc2lnbm1lbnRzKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXNzaWdubWVudHMgPSBwcEFzc2lnbm1lbnRTZXJ2aWNlLmFzc2lnbm1lbnRzO1xyXG4gICAgICAgICAgICB9KVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc2NvcGUpe1xyXG5cdHZhciBzZWxmID0gJHNjb3BlO1xyXG5cdFxyXG5cclxuXHRzZWxmLmlzU2hvd2luZyA9IHRydWU7XHJcblxyXG5cdHNlbGYudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdHNlbGYuaXNTaG93aW5nID0gIXNlbGYuaXNTaG93aW5nO1xyXG5cdH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlLCAkbWREaWFsb2csICRtZFRvYXN0LCBwcEFzc2lnbm1lbnRTZXJ2aWNlLCBwcFJldmlld1NlcnZpY2UsIGFzc2lnbm1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy9NYXliZSB0aGVyZSBhbHJlYWR5IGlzIGEgcmV2aWV3IG9wZW5cclxuICAgICRzY29wZS5yZXZpZXcgPSBhc3NpZ25tZW50Lm15UmV2aWV3O1xyXG4gICAgXHJcbiAgICBcclxuICAgICRzY29wZS5yZXF1ZXN0U3VibWlzc2lvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHBSZXZpZXdTZXJ2aWNlLmdldFN1Ym1pc3Npb24oYXNzaWdubWVudC5faWQsIGZ1bmN0aW9uKHJldmlldyl7XHJcbiAgICAgICAgICAgIGlmKHJldmlldy5lcnJvciA9PSA1MDMpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFciB6aWpuIG9wIGRpdCBtb21lbnQgaGVsYWFzIGdlZW4gc3VibWlzc2lvbnMgb20gdGUgcmV2aWV3ZW4uIFByb2JlZXIgaGV0IGxhdGVyIG5vZyBlZW5zIVwiKTtcclxuICAgICAgICAgICAgICAgICRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUucmV2aWV3ID0gcmV2aWV3O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkc2NvcGUuY2FuY2VsRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXNzaWdubWVudC5yZXZpZXcgPSAkc2NvcGUucmV2aWV3O1xyXG4gICAgICAgIHBwQXNzaWdubWVudFNlcnZpY2UuYXNzaWdubWVudERpY1thc3NpZ25tZW50Lm5hbWVdID0gYXNzaWdubWVudDsgIFxyXG4gICAgICAgICRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgICRzY29wZS5zdWJtaXRSZXZpZXcgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBwUmV2aWV3U2VydmljZS5zdWJtaXRSZXZpZXcoJHNjb3BlLnJldmlldywgZnVuY3Rpb24ocmV2aWV3KXtcclxuICAgICAgICAgICAgYXNzaWdubWVudC5yZXZpZXcgPSByZXZpZXc7XHJcbiAgICAgICAgICAgIHBwQXNzaWdubWVudFNlcnZpY2UuYXNzaWdubWVudERpY1thc3NpZ25tZW50Lm5hbWVdID0gYXNzaWdubWVudDtcclxuICAgICAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgICAgICAgICAgJG1kVG9hc3Quc2hvdyh7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxtZC10b2FzdCBjbGFzcz1cIm1kLXRvYXN0IHN1Y2Nlc3NcIj48c3BhbiBmbGV4PlJldmlldyBzdWJtaXR0ZWQhIDwvc3Bhbj48L21kLXRvYXN0PicsXHJcbiAgICAgICAgICAgICAgICBoaWRlRGVsYXk6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgOiAkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignI3RvYXN0Qm91bmRzJyksXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCByaWdodCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlLCAkbWREaWFsb2csICRtZFRvYXN0LCBwcEFzc2lnbm1lbnRTZXJ2aWNlLCAkZG9jdW1lbnQsIGFzc2lnbm1lbnQpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAkc2NvcGUuc3VibWlzc2lvbiA9IGFzc2lnbm1lbnQubXlTdWJtaXNzaW9uO1xyXG4gICAgXHJcbiAgICAkc2NvcGUuc3VibWl0QXNzaWdubWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHBBc3NpZ25tZW50U2VydmljZS5zdWJtaXRBc3NpZ25tZW50KGFzc2lnbm1lbnQuX2lkLCAkc2NvcGUuc3VibWlzc2lvbiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgICAgICAgICAgc2hvd1N1Y2Nlc3MoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAkc2NvcGUuY2FuY2VsRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gc2hvd1N1Y2Nlc3MoKXtcclxuICAgICAgICAkbWRUb2FzdC5zaG93KHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnPG1kLXRvYXN0IGNsYXNzPVwibWQtdG9hc3Qgc3VjY2Vzc1wiPjxzcGFuIGZsZXg+QXNzaWdubWVudCBzdWJtaXR0ZWQhIDwvc3Bhbj48L21kLXRvYXN0PicsXHJcbiAgICAgICAgICAgICAgICBoaWRlRGVsYXk6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgOiAkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignI3RvYXN0Qm91bmRzJyksXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCByaWdodCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJG1kU2lkZW5hdiwgJGxvZywgJHJvb3RTY29wZSwgJHEpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0dmFyIHJhdGlvID0gMS43NDM7XHJcblxyXG5cdHNlbGYuaW1hZ2VMb2NhdGlvbnMgPSBbXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9CYWNrZ3JvdW5kX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwLjQgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL3dvbGsxX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwLjUsIGNsYXNzZXM6XCJjbG91ZFwiIH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9NVkNfbWVkaXVtLnBuZ1wiLCBvZmZzZXQ6IDAgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL1dDRl9tZWRpdW0ucG5nXCIsIG9mZnNldDogMS4yIH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9FRi5wbmdcIiwgb2Zmc2V0OiAxLjQgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL1dQRi5wbmdcIiwgb2Zmc2V0OiAxLjYgfSxcclxuXHRcdHsgc3JjOiBcImRlZmF1bHQvaW1nL3dvbGsyX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwLCBjbGFzc2VzOlwiY2xvdWQgcmVldmVyc2VcIiB9LFxyXG5cdF07XHJcblxyXG5cdHZhciBjYW52YXNXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRXaWR0aDtcclxuXHR2YXIgY2FudmFzSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLm9mZnNldEhlaWdodDtcclxuXHRcclxuXHQkc2NvcGUucmVhZHkgPSBmYWxzZTtcclxuXHQkc2NvcGUucmVhbEhlaWdodCA9IChjYW52YXNXaWR0aCAqIHJhdGlvIC0gY2FudmFzSGVpZ2h0KTtcclxuXHJcblx0JHNjb3BlLnRvTGV2ZWwgPSBmdW5jdGlvbihuZXdMZXZlbCl7XHJcblx0XHQkc2NvcGUubGV2ZWwgPSAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIG5ld0xldmVsO1xyXG5cdH1cclxuXHRcclxuXHQkc2NvcGUuaXNOZWFyID0gZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0aWYoISRzY29wZS5yZWFkeSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcclxuXHRcdHZhbHVlID0gICRzY29wZS5yZWFsSGVpZ2h0IC8gMTAwICogdmFsdWU7XHJcblx0XHRyZXR1cm4gJHNjb3BlLmxldmVsIDwgKHZhbHVlICsgMTAwKSAmJiAkc2NvcGUubGV2ZWwgPiAodmFsdWUgLSAxMDApO1xyXG5cdH07XHJcblx0XHJcblx0JHNjb3BlLmdldFNyY3NldCA9IGZ1bmN0aW9uKGltZyl7XHJcblx0XHRcclxuXHRcdHZhciByb290ID0gXCJkZWZhdWx0L2ltZy9cIjtcclxuXHRcdHJldHVybiByb290ICsgaW1nICsgXCJfc21hbGwucG5nIDYwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX21lZGl1bS5wbmcgOTAwdywgXCIgKyByb290ICsgaW1nICsgXCJfbGFyZ2UucG5nIDEyMDB3XCI7XHJcblx0fVxyXG5cclxuXHR2YXIgcHJlbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcyl7XHJcblx0XHQgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblx0XHQgIHZhciBjb3VudCA9IDA7XHJcblxyXG5cdFx0ICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWcpe1xyXG5cdFx0XHQkKCc8aW1nPicpLmF0dHIoeyBzcmM6IGltZy5zcmMgfSkubG9hZChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHRcdGlmKGNvdW50ID09IGltYWdlcy5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHQgIH0pO1xyXG5cdFx0IFxyXG5cdFx0ICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuXHR9XHJcblxyXG5cdHByZWxvYWRJbWFnZXMoc2VsZi5pbWFnZUxvY2F0aW9ucykudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0JCgnI2xvYWRlcicpLmhlaWdodCgwKTtcclxuXHRcdCRzY29wZS5yZWFkeSA9IHRydWU7XHJcblx0XHQkc2NvcGUudG9MZXZlbCgxMDApO1xyXG5cdH0pO1xyXG5cdFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICBzY29wZToge1xyXG4gICAgICAgIG9uc29ydDogJz0nXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuICAgICAgICBcclxuICAgICAgICAvL3N1YnNjcmliZVxyXG4gICAgICAgIGlmKCFzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKXtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQgPSAwO1xyXG4gICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQrKztcclxuXHJcbiAgICAgICAgZWxlbS5vbignbG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkKys7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPT0gc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50LmxvYWRpbmdDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG5cdHRyYW5zY2x1ZGU6IHRydWUsXHJcblx0dGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0ncm93Jz48ZGl2IGNsYXNzPSdjb2wtbWQtMSc+PC9kaXY+PGRpdiBjbGFzcz0nY29sLW1kLTEwJz48bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+PGRpdiBjbGFzcz0nY29sLW1kLTEnPjwvZGl2PjwvZGl2PlwiLFxyXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpe1xyXG5cdFx0XHJcblx0XHQvL01vZXQgbWV0IHRpbWVvdXQgZGFua3ppaiBib290c3RyYXBcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoZWxlbWVudCkuZmluZCgnLndyYXBwZXInKS50d2VudHl0d2VudHkoKTtcclxuXHRcdH0sIDMwMCk7XHJcblx0XHRcclxuXHRcdFx0XHJcblx0fVxyXG4gIH07XHJcbn07Il19
