(function() {
  angular.module('myApp', ['ui.bootstrap', 'ngFileSaver', 'commonLib', 'ngFileUpload']);
})();

angular.module('myApp').directive('integerOnly', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9]/g, '');
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return '';
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
});
