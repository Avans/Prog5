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
var feedbackCtrl =  require('./controllers/feedbackCtrl');

var emailShort = require('./filters/emailshort');

//Add the controller and config to the module
app.controller('appCtrl', appCtrl);
app.controller('towerCtrl', towerCtrl);
app.controller('hoverCtrl', hoverCtrl);
app.controller('submitCtrl', submitCtrl);
app.controller('reviewCtrl', reviewCtrl);
app.controller('feedbackCtrl', feedbackCtrl);

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




  


},{"./config/routes":2,"./controllers/appCtrl":3,"./controllers/assignmentCtrl":4,"./controllers/feedbackCtrl":5,"./controllers/hoverCtrl":6,"./controllers/reviewCtrl":7,"./controllers/submitCtrl":8,"./controllers/towerCtrl":9,"./directives/sbLoad":10,"./directives/twentytwenty":11,"./filters/emailshort":12}],2:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
module.exports = function($scope){
	var self = $scope;
	

	self.isShowing = true;

	self.toggle = function(){
		self.isShowing = !self.isShowing;
	}
}
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
module.exports = function() {
    return function(input) {
        return input ? input.split('@')[0] : "";
  }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbmZpZy9yb3V0ZXMuanMiLCJhcHAvanMvY29udHJvbGxlcnMvYXBwQ3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy9mZWVkYmFja0N0cmwuanMiLCJhcHAvanMvY29udHJvbGxlcnMvaG92ZXJDdHJsLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL3Jldmlld0N0cmwuanMiLCJhcHAvanMvY29udHJvbGxlcnMvc3VibWl0Q3RybC5qcyIsImFwcC9qcy9jb250cm9sbGVycy90b3dlckN0cmwuanMiLCJhcHAvanMvZGlyZWN0aXZlcy9zYkxvYWQuanMiLCJhcHAvanMvZGlyZWN0aXZlcy90d2VudHl0d2VudHkuanMiLCJhcHAvanMvZmlsdGVycy9lbWFpbHNob3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIEZGQjkwMSAqL1xyXG5cclxuLyoqXHJcbiAqIFN0ZXAgMSAtIE1ha2luZyBvdXIgb3duIG1vZHVsZVxyXG4gKiBEZXBlbmRlbmNpZXMgaW4gdGhpcyBEZW1vXHJcbiAqICBQb2ludHlQb255IDogVGhlIGFuZ3VsYXIgbW9kdWxlIGZyb20gQWR2YW5zLiBJdCBjb250YWlucyBlbGVtZW50cyB0aGF0IHdlIGNhbiByZXVzZS5cclxuICogUmVhZCB0aGUgZG9jcyB0byBsZWFybiBtb3JlLiBodHRwOi8vYWR2YW5zLmhlcm9rdWFwcC5jb20vIy9kb2NzXHJcbiAqICB1aS5yb3V0ZXIgIDogVGhlIGFuZ3VsYXIgbW9kb2xlIHRvIGhlbHAgbmF2aWdhdGUgZnJvbSBwYWdlIHRvIHBhZ2UuIFxyXG4gKiBsZWFybiBtb3JlIG9uIGh0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5pby91aS1yb3V0ZXIvc2l0ZS8jL2FwaS91aS5yb3V0ZXJcclxuICogIG5nTWF0ZXJpYWwgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3IgcmVuZGVyaW5nIG1hdGVyaWFsIHN0eWxlZCBlbGVtZW50c1xyXG4gKiByZWFkIG1vcmUgb24gIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy9sYXRlc3QvXHJcbiAqICBuZ01kSWNvbnMgOiBBbiBBbmd1bGFyIGJhc2VkIGZyYW1ld29yayBmb3Igc2hvd2luZyBpY29uc1xyXG4qL1xyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ1Byb2c1JywgW1wiUG9pbnR5UG9ueVwiLCBcIm5nTWRJY29uc1wiLCBcInVpLnJvdXRlclwiLCAgXCJuZ01hdGVyaWFsXCJdKTtcclxuXHJcblxyXG4vKipcclxuICogU3RlcCAyIC0gUmVmZXJlbmNpbmcgb3VyIG9ubGluZSBjb3Vyc2VcclxuICogWW91IGNhbiBmaW5kIHlvdXIgY291cnNlIHRva2VuIG9uIGFkdmFucy5oZXJva3VhcHAuY29tXHJcbiAqL1xyXG5hcHAuY29uc3RhbnQoJ2FwcENvbmZpZycsIHtcclxuXHQvL1JlcGxhY2UgdGhpcyB0b2tlbiB3aXRoIHlvdXIgdG9rZW4gZnJvbSB0aGUgY291cnNlXHJcblx0Y291cnNlVG9rZW46IFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LklsQnliMmMxSWcuTGJkNWU5d1lvaGZFUGtBLXRfREU0U0p1SUlycHlLUUJ3SGlBNzNkcFRYUVwiLFxyXG59KTtcclxuXHJcbi8vTWFrZSB5b3VyIG93biBlbGVtZW50cywgaW4gb3VyIGNhc2UgYSByb3V0aW5nIGNvbmZpZyBhbmQgYSBhcHAgY29udHJvbGxlclxyXG52YXIgcm91dGVzQ29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcvcm91dGVzJyk7XHJcbnZhciBhcHBDdHJsID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXBwQ3RybFwiKTtcclxudmFyIHN1Ym1pdEN0cmwgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9zdWJtaXRDdHJsXCIpO1xyXG52YXIgcmV2aWV3Q3RybCA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3Jldmlld0N0cmxcIik7XHJcbnZhciB0b3dlckN0cmwgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3Rvd2VyQ3RybCcpO1xyXG52YXIgc2JMb2FkID0gcmVxdWlyZSgnLi9kaXJlY3RpdmVzL3NiTG9hZCcpO1xyXG52YXIgdHdlbnR5dHdlbnR5ID0gcmVxdWlyZSgnLi9kaXJlY3RpdmVzL3R3ZW50eXR3ZW50eScpO1xyXG52YXIgaG92ZXJDdHJsID0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9ob3ZlckN0cmwnKTtcclxudmFyIGZlZWRiYWNrQ3RybCA9ICByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2ZlZWRiYWNrQ3RybCcpO1xyXG5cclxudmFyIGVtYWlsU2hvcnQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvZW1haWxzaG9ydCcpO1xyXG5cclxuLy9BZGQgdGhlIGNvbnRyb2xsZXIgYW5kIGNvbmZpZyB0byB0aGUgbW9kdWxlXHJcbmFwcC5jb250cm9sbGVyKCdhcHBDdHJsJywgYXBwQ3RybCk7XHJcbmFwcC5jb250cm9sbGVyKCd0b3dlckN0cmwnLCB0b3dlckN0cmwpO1xyXG5hcHAuY29udHJvbGxlcignaG92ZXJDdHJsJywgaG92ZXJDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3N1Ym1pdEN0cmwnLCBzdWJtaXRDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ3Jldmlld0N0cmwnLCByZXZpZXdDdHJsKTtcclxuYXBwLmNvbnRyb2xsZXIoJ2ZlZWRiYWNrQ3RybCcsIGZlZWRiYWNrQ3RybCk7XHJcblxyXG5hcHAuY29udHJvbGxlcignYXNzaWdubWVudEN0cmwnLCByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hc3NpZ25tZW50Q3RybFwiKSk7XHJcblxyXG5hcHAuZGlyZWN0aXZlKCdzYkxvYWQnLCBzYkxvYWQpO1xyXG5hcHAuZGlyZWN0aXZlKCd0d2VudHl0d2VudHknLCB0d2VudHl0d2VudHkpO1xyXG5cclxuYXBwLmZpbHRlcignZW1haWxTaG9ydCcsICBlbWFpbFNob3J0KTtcclxuXHJcbmFwcC5jb25maWcocm91dGVzQ29uZmlnKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAuYWNjZW50UGFsZXR0ZSgnYmx1ZScpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiAgXHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIFxyXG4gICAgLy9EZWZhdWx0IHJvdXRlXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdob21lJyk7XHJcbiAgICBcclxuICAgIC8vTWV0aG9kZSB2b29yIHRvZXZvZWdlbiBzdGF0ZSwgXHJcbiAgICAvL1N0YXRlIGlzIGluIGNhbWVsQ2FzZVxyXG4gICAgZnVuY3Rpb24gYWRkU3RhdGUoc3RhdGUpe1xyXG4gICAgICAgICB2YXIgdXJsID0gc3RhdGUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLyQyJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoc3RhdGUsIHt1cmw6ICcvJyArIHVybCwgdGVtcGxhdGVVcmwgOiAnb25kZXJ3ZXJwLycgKyB1cmwgKyAnLmh0bWwnIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1JlZ2lzdGVyIGFsbCB0aGUgcm91dGVzXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vRGVmYXVsdCBwYWdlc1xyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHsgdXJsOiAnL2hvbWUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvaG9tZS5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbGVhZGVyYm9hcmRzJywgeyB1cmw6ICcvbGVhZGVyYm9hcmRzJywgIHRlbXBsYXRlVXJsOidkZWZhdWx0L2xlYWRlcmJvYXJkcy5odG1sJyB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHsgdXJsOiAnL3Byb2ZpbGUnLCAgdGVtcGxhdGVVcmw6J2RlZmF1bHQvcHJvZmlsZS5odG1sJyB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjEnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWsxJywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazEuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuMicsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazInLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrMi5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW4zJywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrMycsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWszLmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbjQnLCB7IHVybDogJy9vcGRyYWNodGVuL3dlZWs0JywgdGVtcGxhdGVVcmw6J29wZHJhY2h0ZW4vd2VlazQuaHRtbCcgfSApXHJcbiAgICAgICAgLnN0YXRlKCdvcGRyYWNodGVuNScsIHsgdXJsOiAnL29wZHJhY2h0ZW4vd2VlazUnLCB0ZW1wbGF0ZVVybDonb3BkcmFjaHRlbi93ZWVrNS5odG1sJyB9IClcclxuICAgICAgICAuc3RhdGUoJ29wZHJhY2h0ZW42JywgeyB1cmw6ICcvb3BkcmFjaHRlbi93ZWVrNicsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL3dlZWs2Lmh0bWwnIH0gKVxyXG4gICAgICAgIC5zdGF0ZSgnb3BkcmFjaHRlbk92ZXJ2aWV3JywgeyB1cmw6ICcvb3BkcmFjaHRlbi9vdmVydmlldycsIHRlbXBsYXRlVXJsOidvcGRyYWNodGVuL292ZXJ2aWV3Lmh0bWwnIH0gKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9Db250ZW50XHJcbiAgICAgICAgLy9uZXRcclxuICAgICAgICBhZGRTdGF0ZSgnbmV0SW50cm9kdWN0aWUnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnbmV0VmlzdWFsc3R1ZGlvJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ25ldEFzc2VtYmxpZXMnKTtcclxuICAgICAgICAvL2NzaGFycFxyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBQcm9wZXJ0aWVzJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2NzaGFycExhbWJkYScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdjc2hhcnBMaW5xJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2NzaGFycEd1aWRlbGluZXMnKTtcclxuICAgICAgICAvL3dwZlxyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZYYW1sJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3dwZkNvbXBvbmVudGVuJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ3dwZkJpbmRpbmcnKTtcclxuICAgICAgICBhZGRTdGF0ZSgnd3BmQ29tbWFuZCcpO1xyXG4gICAgICAgIGFkZFN0YXRlKCd3cGZDb252ZXJ0Jyk7XHJcbiAgICAgICAgLy9tdnZtXHJcbiAgICAgICAgYWRkU3RhdGUoJ212dm1JbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdtdnZtQXJjaGl0ZWN0dXVyJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ212dm1GcmFtZXdvcmtzJyk7XHJcbiAgICAgICAgLy9NdmNcclxuICAgICAgICBhZGRTdGF0ZSgnZWZJbnRyb2R1Y3RpZScpO1xyXG4gICAgICAgIGFkZFN0YXRlKCdlZkRhdGFiYXNlJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2VmRW50aXR5ZnJhbWV3b3JrJyk7XHJcbiAgICAgICAgYWRkU3RhdGUoJ2VmRGF0YWJhc2VmaXJzdCcpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICR0aW1lb3V0LCAkbWREaWFsb2csIHBwQXV0aFNlcnZpY2UsICRtZFNpZGVuYXYsICRtZE1lZGlhLCAkbG9nLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRhbmNob3JTY3JvbGwsICRkb2N1bWVudCkge1xyXG5cclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZGF0YSwgdHdvKXtcclxuXHRcdCQoJy5zY3JvbGxXaWR0aCcpLmNzcygndG9wJywgICQodGhpcykuc2Nyb2xsVG9wKCkgKyBcInB4XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFx0XHQkKCcuc2Nyb2xsV2l0aCcpLmFuaW1hdGUoe1xyXG4gICAgICAgIC8vICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAkKHRoaXMpLnNjcm9sbFRvcCgpICsgXCJweFwiICsnKSdcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBcclxuXHR9KTtcclxuICAgIFxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZSwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IDA7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJHNjb3BlLnRvZ2dsZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAkbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICRzY29wZS5jbG9zZUxlZnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgJHNjb3BlLnNjcm9sbFRvID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICB2YXIgb2xkID0gJGxvY2F0aW9uLmhhc2goKTtcclxuICAgICAgICAkbG9jYXRpb24uaGFzaChpZCk7XHJcbiAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICRsb2NhdGlvbi5oYXNoKG9sZCk7XHJcbiAgIH1cclxuXHJcbiAgIHBwQXV0aFNlcnZpY2UuZ2V0VXNlcihmdW5jdGlvbih1c2VyKXtcclxuXHRcdGlmKHVzZXIuZXJyb3IpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHQkcm9vdFNjb3BlLnVzZXIgPSB1c2VyO1xyXG4gICAgfSk7XHJcbiAgIFxyXG4gICAkcm9vdFNjb3BlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihkaWFsb2dOYW1lLCBldiwgcGFyYW1zKXtcclxuICAgICAgICB2YXIgdXNlRnVsbFNjcmVlbiA9ICgkbWRNZWRpYSgnc20nKSB8fCAkbWRNZWRpYSgneHMnKSkgICYmICRzY29wZS5jdXN0b21GdWxsc2NyZWVuO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRtZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgY29udHJvbGxlcjogZGlhbG9nTmFtZSArICdDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvZGlhbG9ncy8nICArIGRpYWxvZ05hbWUgKycuaHRtbCcsXHJcbiAgICAgICAgICAgIGxvY2FsczogcGFyYW1zLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcclxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOnRydWUsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHVzZUZ1bGxTY3JlZW5cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtcy5jYil7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICB9XHJcbiAgIFxyXG4gIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlLCAkbWREaWFsb2csICRtZFRvYXN0LCBwcEFzc2lnbm1lbnRTZXJ2aWNlLCBwcFJldmlld1NlcnZpY2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLmFzc2lnbm1lbnRzID0gW107XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcEFzc2lnbm1lbnRTZXJ2aWNlLmdldEFzc2lnbm1lbnRzKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXNzaWdubWVudHMgPSBwcEFzc2lnbm1lbnRTZXJ2aWNlLmFzc2lnbm1lbnRzO1xyXG4gICAgICAgICAgICB9KVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc2NvcGUsICRtZERpYWxvZywgJG1kVG9hc3QsIHBwRmVlZGJhY2tTZXJ2aWNlKXtcclxuXHRcclxuXHRcclxuICAgICRzY29wZS5mZWVsaW5nID0gbnVsbDtcclxuXHJcblx0JHNjb3BlLnNlbmRGZWVkYmFjayA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFxyXG5cdFx0dmFyIGZlZWRiYWNrID0ge1xyXG5cdFx0XHRmZWVsaW5nOiAkc2NvcGUuZmVlbGluZywgXHJcblx0XHRcdGRlc2NyaXB0aW9uOiAkc2NvcGUuZGVzY3JpcHRpb25cclxuXHRcdH07XHJcblxyXG5cdFx0cHBGZWVkYmFja1NlcnZpY2UucG9zdEZlZWRiYWNrKGZlZWRiYWNrLCBmdW5jdGlvbihyZXN1bHQpe1xyXG5cdFx0XHQkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5tc2cgPT0gXCJzdWNjZXNzXCIpe1xyXG4gICAgICAgICAgICAgICAgJG1kVG9hc3Quc2hvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICc8bWQtdG9hc3QgY2xhc3M9XCJtZC10b2FzdCBzdWNjZXNzXCI+PHNwYW4gZmxleD5GZWVkYmFjayBzdWJtaXR0ZWQhIDwvc3Bhbj48L21kLXRvYXN0PicsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZURlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA6ICRkb2N1bWVudFswXS5xdWVyeVNlbGVjdG9yKCcjdG9hc3RCb3VuZHMnKSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCByaWdodCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAkbWRUb2FzdC5zaG93KHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxtZC10b2FzdCBjbGFzcz1cIm1kLXRvYXN0IHdhcm5pbmdcIj48c3BhbiBmbGV4PlNvbWV0aGluZyB3ZW50IHdyb250IDooIDwvc3Bhbj48L21kLXRvYXN0PicsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZURlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA6ICRkb2N1bWVudFswXS5xdWVyeVNlbGVjdG9yKCcjdG9hc3RCb3VuZHMnKSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3RvcCByaWdodCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9KVxyXG5cclxuXHR9O1xyXG5cclxuICAgICRzY29wZS5jYW5jZWxEaWFsb2cgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9O1xyXG5cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHNjb3BlKXtcclxuXHR2YXIgc2VsZiA9ICRzY29wZTtcclxuXHRcclxuXHJcblx0c2VsZi5pc1Nob3dpbmcgPSB0cnVlO1xyXG5cclxuXHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRzZWxmLmlzU2hvd2luZyA9ICFzZWxmLmlzU2hvd2luZztcclxuXHR9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzY29wZSwgJG1kRGlhbG9nLCAkbWRUb2FzdCwgcHBBc3NpZ25tZW50U2VydmljZSwgcHBSZXZpZXdTZXJ2aWNlLCBhc3NpZ25tZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vTWF5YmUgdGhlcmUgYWxyZWFkeSBpcyBhIHJldmlldyBvcGVuXHJcbiAgICAkc2NvcGUucmV2aWV3ID0gYXNzaWdubWVudC5teVJldmlldztcclxuICAgIFxyXG4gICAgXHJcbiAgICAkc2NvcGUucmVxdWVzdFN1Ym1pc3Npb24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBwUmV2aWV3U2VydmljZS5nZXRTdWJtaXNzaW9uKGFzc2lnbm1lbnQuX2lkLCBmdW5jdGlvbihyZXZpZXcpe1xyXG4gICAgICAgICAgICBpZihyZXZpZXcuZXJyb3IgPT0gNTAzKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXIgemlqbiBvcCBkaXQgbW9tZW50IGhlbGFhcyBnZWVuIHN1Ym1pc3Npb25zIG9tIHRlIHJldmlld2VuLiBQcm9iZWVyIGhldCBsYXRlciBub2cgZWVucyFcIik7XHJcbiAgICAgICAgICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLnJldmlldyA9IHJldmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLmNhbmNlbERpYWxvZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFzc2lnbm1lbnQucmV2aWV3ID0gJHNjb3BlLnJldmlldztcclxuICAgICAgICBwcEFzc2lnbm1lbnRTZXJ2aWNlLmFzc2lnbm1lbnREaWNbYXNzaWdubWVudC5uYW1lXSA9IGFzc2lnbm1lbnQ7ICBcclxuICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAkc2NvcGUuc3VibWl0UmV2aWV3ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBwcFJldmlld1NlcnZpY2Uuc3VibWl0UmV2aWV3KCRzY29wZS5yZXZpZXcsIGZ1bmN0aW9uKHJldmlldyl7XHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnQucmV2aWV3ID0gcmV2aWV3O1xyXG4gICAgICAgICAgICBwcEFzc2lnbm1lbnRTZXJ2aWNlLmFzc2lnbm1lbnREaWNbYXNzaWdubWVudC5uYW1lXSA9IGFzc2lnbm1lbnQ7XHJcbiAgICAgICAgICAgICRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICAgICAgICAgICRtZFRvYXN0LnNob3coe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICc8bWQtdG9hc3QgY2xhc3M9XCJtZC10b2FzdCBzdWNjZXNzXCI+PHNwYW4gZmxleD5SZXZpZXcgc3VibWl0dGVkISA8L3NwYW4+PC9tZC10b2FzdD4nLFxyXG4gICAgICAgICAgICAgICAgaGlkZURlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50IDogJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyN0b2FzdEJvdW5kcycpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AgcmlnaHQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzY29wZSwgJG1kRGlhbG9nLCAkbWRUb2FzdCwgcHBBc3NpZ25tZW50U2VydmljZSwgJGRvY3VtZW50LCBhc3NpZ25tZW50KXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgJHNjb3BlLnN1Ym1pc3Npb24gPSBhc3NpZ25tZW50Lm15U3VibWlzc2lvbjtcclxuICAgIFxyXG4gICAgJHNjb3BlLnN1Ym1pdEFzc2lnbm1lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBwQXNzaWdubWVudFNlcnZpY2Uuc3VibWl0QXNzaWdubWVudChhc3NpZ25tZW50Ll9pZCwgJHNjb3BlLnN1Ym1pc3Npb24sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICAgICAgICAgIHNob3dTdWNjZXNzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgJHNjb3BlLmNhbmNlbERpYWxvZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNob3dTdWNjZXNzKCl7XHJcbiAgICAgICAgJG1kVG9hc3Quc2hvdyh7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxtZC10b2FzdCBjbGFzcz1cIm1kLXRvYXN0IHN1Y2Nlc3NcIj48c3BhbiBmbGV4PkFzc2lnbm1lbnQgc3VibWl0dGVkISA8L3NwYW4+PC9tZC10b2FzdD4nLFxyXG4gICAgICAgICAgICAgICAgaGlkZURlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50IDogJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyN0b2FzdEJvdW5kcycpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AgcmlnaHQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQsICRtZFNpZGVuYXYsICRsb2csICRyb290U2NvcGUsICRxKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHZhciByYXRpbyA9IDEuNzQzO1xyXG5cclxuXHRzZWxmLmltYWdlTG9jYXRpb25zID0gW1xyXG5cdFx0eyBzcmM6IFwiZGVmYXVsdC9pbWcvQmFja2dyb3VuZF9tZWRpdW0ucG5nXCIsIG9mZnNldDogMC40IH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy93b2xrMV9tZWRpdW0ucG5nXCIsIG9mZnNldDogMC41LCBjbGFzc2VzOlwiY2xvdWRcIiB9LFxyXG5cdFx0eyBzcmM6IFwiZGVmYXVsdC9pbWcvTVZDX21lZGl1bS5wbmdcIiwgb2Zmc2V0OiAwIH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9XQ0ZfbWVkaXVtLnBuZ1wiLCBvZmZzZXQ6IDEuMiB9LFxyXG5cdFx0eyBzcmM6IFwiZGVmYXVsdC9pbWcvRUYucG5nXCIsIG9mZnNldDogMS40IH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy9XUEYucG5nXCIsIG9mZnNldDogMS42IH0sXHJcblx0XHR7IHNyYzogXCJkZWZhdWx0L2ltZy93b2xrMl9tZWRpdW0ucG5nXCIsIG9mZnNldDogMCwgY2xhc3NlczpcImNsb3VkIHJlZXZlcnNlXCIgfSxcclxuXHRdO1xyXG5cclxuXHR2YXIgY2FudmFzV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykub2Zmc2V0V2lkdGg7XHJcblx0dmFyIGNhbnZhc0hlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5vZmZzZXRIZWlnaHQ7XHJcblx0XHJcblx0JHNjb3BlLnJlYWR5ID0gZmFsc2U7XHJcblx0JHNjb3BlLnJlYWxIZWlnaHQgPSAoY2FudmFzV2lkdGggKiByYXRpbyAtIGNhbnZhc0hlaWdodCk7XHJcblxyXG5cdCRzY29wZS50b0xldmVsID0gZnVuY3Rpb24obmV3TGV2ZWwpe1xyXG5cdFx0JHNjb3BlLmxldmVsID0gJHNjb3BlLnJlYWxIZWlnaHQgLyAxMDAgKiBuZXdMZXZlbDtcclxuXHR9XHJcblx0XHJcblx0JHNjb3BlLmlzTmVhciA9IGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdGlmKCEkc2NvcGUucmVhZHkpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHJcblx0XHR2YWx1ZSA9ICAkc2NvcGUucmVhbEhlaWdodCAvIDEwMCAqIHZhbHVlO1xyXG5cdFx0cmV0dXJuICRzY29wZS5sZXZlbCA8ICh2YWx1ZSArIDEwMCkgJiYgJHNjb3BlLmxldmVsID4gKHZhbHVlIC0gMTAwKTtcclxuXHR9O1xyXG5cdFxyXG5cdCRzY29wZS5nZXRTcmNzZXQgPSBmdW5jdGlvbihpbWcpe1xyXG5cdFx0XHJcblx0XHR2YXIgcm9vdCA9IFwiZGVmYXVsdC9pbWcvXCI7XHJcblx0XHRyZXR1cm4gcm9vdCArIGltZyArIFwiX3NtYWxsLnBuZyA2MDB3LCBcIiArIHJvb3QgKyBpbWcgKyBcIl9tZWRpdW0ucG5nIDkwMHcsIFwiICsgcm9vdCArIGltZyArIFwiX2xhcmdlLnBuZyAxMjAwd1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIHByZWxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpe1xyXG5cdFx0ICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cdFx0ICB2YXIgY291bnQgPSAwO1xyXG5cclxuXHRcdCAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1nKXtcclxuXHRcdFx0JCgnPGltZz4nKS5hdHRyKHsgc3JjOiBpbWcuc3JjIH0pLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0XHRpZihjb3VudCA9PSBpbWFnZXMubGVuZ3RoKXtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0ICB9KTtcclxuXHRcdCBcclxuXHRcdCAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkSW1hZ2VzKHNlbGYuaW1hZ2VMb2NhdGlvbnMpLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdCQoJyNsb2FkZXInKS5oZWlnaHQoMCk7XHJcblx0XHQkc2NvcGUucmVhZHkgPSB0cnVlO1xyXG5cdFx0JHNjb3BlLnRvTGV2ZWwoMTAwKTtcclxuXHR9KTtcclxuXHRcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFsnJHBhcnNlJywgZnVuY3Rpb24gKCRwYXJzZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgc2NvcGU6IHtcclxuICAgICAgICBvbnNvcnQ6ICc9J1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0sIGF0dHJzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zdWJzY3JpYmVcclxuICAgICAgICBpZighc2NvcGUuJHBhcmVudC5lbGVtZW50c1RvTG9hZCl7XHJcbiAgICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkID0gMDtcclxuICAgICAgICAgIHNjb3BlLiRwYXJlbnQuZWxlbWVudHNMb2FkZWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzY29wZS4kcGFyZW50LmVsZW1lbnRzVG9Mb2FkKys7XHJcblxyXG4gICAgICAgIGVsZW0ub24oJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5lbGVtZW50c0xvYWRlZCsrO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzY29wZS4kcGFyZW50LmVsZW1lbnRzTG9hZGVkID09IHNjb3BlLiRwYXJlbnQuZWxlbWVudHNUb0xvYWQpe1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuJHBhcmVudC5sb2FkaW5nQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5sb2FkaW5nQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1dOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuXHR0cmFuc2NsdWRlOiB0cnVlLFxyXG5cdHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9J3Jvdyc+PGRpdiBjbGFzcz0nY29sLW1kLTEnPjwvZGl2PjxkaXYgY2xhc3M9J2NvbC1tZC0xMCc+PG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPjwvZGl2PjxkaXYgY2xhc3M9J2NvbC1tZC0xJz48L2Rpdj48L2Rpdj5cIixcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KXtcclxuXHRcdFxyXG5cdFx0Ly9Nb2V0IG1ldCB0aW1lb3V0IGRhbmt6aWogYm9vdHN0cmFwXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKGVsZW1lbnQpLmZpbmQoJy53cmFwcGVyJykudHdlbnR5dHdlbnR5KCk7XHJcblx0XHR9LCAzMDApO1xyXG5cdFx0XHJcblx0XHRcdFxyXG5cdH1cclxuICB9O1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPyBpbnB1dC5zcGxpdCgnQCcpWzBdIDogXCJcIjtcclxuICB9XHJcbn0iXX0=
