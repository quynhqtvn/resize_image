'use strict';

angular.module('myApp')
  .controller('downloadImageCtrl', downloadImageCtrl);

downloadImageCtrl.$inject = ['Upload'];

function downloadImageCtrl(Upload){
  var vm = this;

  vm.imageTypes = ['jpeg', 'jpg', 'gif','png'];

  vm.initData = function() {
    vm.data = {
      type: 'jpeg',
      radio: 'Capacity',
      name: 'TestImage'
    };
  }

  vm.downloadImage = function(file) {
    file.upload = Upload.upload({
      url: '/create_image',
      data: {
        file: file,
        height: vm.data.height,
        width: vm.data.width,
        capacity: vm.data.capacity,
        radio: vm.data.radio,
        type: vm.data.type,
        name: vm.data.name
      },
    });

    file.upload.then(function (response) {
      if (response.data.success){
        vm.data.errorMsg = null;
        document.location.href = '/download_image?image_path=' + response.data.image_path +
          '&name=' + response.data.name + '&ext=' + response.data.ext
      } else {
        vm.data.errorMsg = response.data.download_image_errors;
      }
     });
  }
}
