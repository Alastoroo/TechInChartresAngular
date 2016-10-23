
//
(function() {
  var app = angular.module('TechInChartres', []);
  //app.config(function($httpProvider) {
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //});

  app.service('anchorSmoothScroll', function(){

      this.scrollTo = function(eID) {

          // This scrolling function
          // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

          var startY = currentYPosition();
          var stopY = elmYPosition(eID);
          var distance = stopY > startY ? stopY - startY : startY - stopY;
          if (distance < 100) {
              scrollTo(0, stopY); return;
          }
          var speed = Math.round(distance / 100);
          if (speed >= 20) speed = 20;
          var step = Math.round(distance / 25);
          var leapY = stopY > startY ? startY + step : startY - step;
          var timer = 0;
          if (stopY > startY) {
              for ( var i=startY; i<stopY; i+=step ) {
                  setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                  leapY += step; if (leapY > stopY) leapY = stopY; timer++;
              } return;
          }
          for ( var i=startY; i>stopY; i-=step ) {
              setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
              leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
          }

          function currentYPosition() {
              // Firefox, Chrome, Opera, Safari
              if (self.pageYOffset) return self.pageYOffset;
              // Internet Explorer 6 - standards mode
              if (document.documentElement && document.documentElement.scrollTop)
                  return document.documentElement.scrollTop;
              // Internet Explorer 6, 7 and 8
              if (document.body.scrollTop) return document.body.scrollTop;
              return 0;
          }

          function elmYPosition(eID) {
              var elm = document.getElementById(eID);
              var y = elm.offsetTop;
              var node = elm;
              while (node.offsetParent && node.offsetParent != document.body) {
                  node = node.offsetParent;
                  y += node.offsetTop;
              } return y - 60;
          }

      };

  });

  app.controller('mainController', function($scope, $location, anchorSmoothScroll) {

    $scope.gotoElement = function (eID){
      $location.hash(eID);
      anchorSmoothScroll.scrollTo(eID);
    };

  });

  // CSS IMPORT
  app.directive('presentationCss', function () {        return {restrict: 'EA',templateUrl: 'css/presentation.css'};});
  app.directive('newsCss', function () {                return {restrict: 'EA',templateUrl: 'css/news.css'};});
  app.directive('intervenantCss', function () {         return {restrict: 'EA',templateUrl: 'css/intervenant.css'};});
  app.directive('imageCitationCss', function () {       return {restrict: 'EA',templateUrl: 'css/imagecitation.css'};});
  app.directive('statCss', function () {                return {restrict: 'EA',templateUrl: 'css/stat.css'};});
  app.directive('equipeCss', function () {              return {restrict: 'EA',templateUrl: 'css/equipe.css'};});
  app.directive('galleryCss', function () {             return {restrict: 'EA',templateUrl: 'css/gallery.css'};});
  app.directive('contactCss', function () {             return {restrict: 'EA',templateUrl: 'css/contact.css'};});
  app.directive('footerCss', function () {              return {restrict: 'EA',templateUrl: 'css/footer.css'};});
  // END CSS IMPORT

  // JS IMPORT (dans le JS on a du HTML et un appel a une fonction js)
  app.directive("countDownJs", function () {return {restrict: 'EA',templateUrl: 'js/jquery.countdown.js'};});
  // END JS IMPORT

  app.directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/navbar.html'
    };
  })
  .directive('countdown', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/countdown.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {
          // Ici on passe deux DIV avec l'ID "countDown" et l'ID "countDown_navbar" a la fonction "countdown"
        	// Ici on utilise un Plugin jQuery, le plugin "countdown".
        	// On défini la date du compte à rebours dans la fonction countdown (La date viendra de l'API Meetup)
          $('#countDown, #countDown_navbar').countdown({
              date: "September 29, 2017 19:00:00"
          });

          $('#topContent, #countDownDisplayTable').css('height', window.innerHeight-70+'px'); // Le 70 c'est pour le margin-top

          var animateArrowDown = function() {
            setInterval(function() {
              $('#arrowDownAnimate').animate({
                'bottom': '40px'
              }, 1000, function() {
                $('#arrowDownAnimate').animate({
                  'bottom': '20px'
                }, 1000);
              });
            }, 2000);
          };
          animateArrowDown();

        });
      }
    };
  })
  .directive('presentation', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/presentation.html'
    };
  })
  .directive('news', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/news.html'
    };
  })
  .directive('intervenant', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/intervenant.html'
    };
  })
  .directive('imageCitation', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/imagecitation.html'
    };
  })
  .directive('stat', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/stat.html'
    };
  })
  .directive('equipe', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/equipe.html'
    };
  })
  .directive('galleryOnePage', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/GalleryOnePage.html'
    };
  })
  .directive('contact', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/contact.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {

        });
      }
    };
  })
  .directive('footer', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/footer.html'
    };
  });

})();
