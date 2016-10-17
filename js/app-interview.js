(function() {
  var app = angular.module('TechInChartres', []);

  app.controller('mainController', function() {

  });

  app.directive('navbar', function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/pages/navbar.html',
      link: function (scope, element, attrs) {
        angular.getTestability(element).whenStable(function() {
          $('#countDown_navbar').countdown({
              date: "September 29, 2017 19:00:00"
          });
        });
      }
    };
  });

})();
