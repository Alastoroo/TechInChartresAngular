(function() {
  var app = angular.module('TechInChartres', []);

  app.controller('mainController', function($scope, $http) {
    $scope.data = undefined;
    $scope.aucunResultat = false;

    // Moteur de recherche qui prend la valeur du champ de
    // recherche et qui affiche les interviews correspondants
    $scope.searchEngine = function(index) {

      var searchValue = $('#search_value').val();
      var interviewName = $scope.data.interviews[index].title;

      if(searchValue.length > 0) {
        var pattern = new RegExp(searchValue, "gi");
        if(pattern.test(interviewName)) {
          console.log('affiche')
          return true;
        }
        else {
          console.log('cache')
          return false;
        }

      }
      else {
        console.log('affiche tout');
        return true;
      }

    };
    /*
    $scope.searchEngineData = function() {
      // Ici cette méthode est appelée lorsque la
      // valeur du champ de recherche est changé
      var search_value = $scope.search_value;

      if(search_value.length > 0) {
        // Si on a quelque chose dans le champ de recherche
        $scope.searchEngine(search_value);
      }
    };
    */
    $http.get('js/interviewExample.json').success(function (data) {
      $scope.data = data;
      //console.log(data);
    })
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

$(document).ready(function() {
  $('#search_value').on('input', function() {
    console.log('hey');
  });
});
