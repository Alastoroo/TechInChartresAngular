
//
(function() {
  var app = angular.module('TechInChartres', []);
  //app.config(function($httpProvider) {
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //});
  app.controller('mainController', function($scope, $location, $anchorScroll) {

    $scope.scrollTo = function(id) {
    $location.hash(id);
      $anchorScroll();
    };

  });

  // CSS IMPORT
  app.directive('presentationCss', function () {return {restrict: 'EA',templateUrl: 'css/presentation.css'};});
  app.directive('newsCss', function () {return {restrict: 'EA',templateUrl: 'css/news.css'};});
  app.directive('intervenantCss', function () {return {restrict: 'EA',templateUrl: 'css/intervenant.css'};});
  app.directive('imageCitationCss', function () {return {restrict: 'EA',templateUrl: 'css/imagecitation.css'};});
  app.directive('statCss', function () {return {restrict: 'EA',templateUrl: 'css/stat.css'};});
  app.directive('equipeCss', function () {return {restrict: 'EA',templateUrl: 'css/equipe.css'};});
  app.directive('galleryCss', function () {return {restrict: 'EA',templateUrl: 'css/gallery.css'};});
  app.directive('contactCss', function () {return {restrict: 'EA',templateUrl: 'css/contact.css'};});
  app.directive('footerCss', function () {return {restrict: 'EA',templateUrl: 'css/footer.css'};});
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
      templateUrl: 'templates/pages/contact.html'
    };
  })
  .directive('footer', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pages/footer.html'
    };
  });

})();
