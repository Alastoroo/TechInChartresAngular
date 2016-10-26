(function() {
  var countInterview = undefined;

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
        if(pattern.test(interviewName))
          return true;
        else
          return false;
      }
      else
        return true;

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
      countInterview = data.interviews.length; // Ici on attribut le nombre d'interview a cette variable
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

  $(document).ready(function() {
    $('#search_value').on('input', function() {
      // Ici on regarde si le nombre de bloc caché (bloc qui ne correspondent pas a la recherche)
      // est le même que le nombre total de bloc. SI oui, alors c'est qu'on a aucun résultat
      // Donc on montre le bloc qui le dit
      if(countInterview === $('.interviewContainer > div.ng-hide').length)
        $('.noresult').removeClass('hideBloc');
      else
        $('.noresult').addClass('hideBloc');
    });
  });

})();
