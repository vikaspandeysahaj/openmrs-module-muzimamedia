var muzimamediaModule = angular.module('muzimamedia', ['ui.bootstrap']);

muzimamediaModule.
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/list/videos', {templateUrl: '../../moduleResources/muzimamedia/partials/list/videos.html'}).
            when('/import/video', {templateUrl: '../../moduleResources/muzimamedia/partials/import/video.html'}).
            when('/list/view/:uuid', {templateUrl: '../../moduleResources/muzimamedia/partials/list/view.html'}).
            otherwise({redirectTo: '/list/videos'});
    }]);


muzimamediaModule.factory('FileUploadService', function ($http) {
    return {
        post: function (options) {
            return $http({
                method: 'POST',
                url: options.url,
                headers: { 'Content-Type': false },
                transformRequest: function (data) {
                    var formData = new FormData();
                    angular.forEach(data.params, function (key, value) {
                        formData.append(value, key);
                    });
                    formData.append("file", data.file);
                    return formData;
                },
                data: {file: options.file, params: options.params}
            })
        }
    };

});

muzimamediaModule.factory('MediaService', function ($http) {

    var all = function () {
        return $http.get('../../ws/rest/v1/muzimamedia/media', {cache: false});
    };
    var saveTag = function (media) {
           return $http.post('video/tag.form', media);
        };
    var get = function (id) {
            return $http.get('../../ws/rest/v1/muzimamedia/media/' + id + "?v=custom:(id,uuid,title,description,version,url,voided,muzimaMediaType,tags)");
        };
     var remove = function (media) {
                return $http.post('video/remove.form', media);
     };

    return {
        all: all,
        saveTag : saveTag,
        get:get,
        remove:remove
        }
});

muzimamediaModule.factory('TagService', function ($http) {
    var all = function () {
        return $http.get('../../ws/rest/v1/muzimamedia/tag');
    };
    return {all: all};
});

muzimamediaModule.factory('TypeService', function ($http) {
    var get = function (id) {
                return $http.get('../../ws/rest/v1/muzimamedia/type/' + id + "?v=custom:(id,name)");
            };
    return {get: get};
});


