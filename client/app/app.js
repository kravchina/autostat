(function() {
    'use strict';

    angular
        .module('auto.stat', [
            'ui.router',

            'auto.stat.partials'
        ])
        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$stateProvider'];

    function config($urlRouterProvider, $stateProvider){
        $stateProvider
            .state('main', {
                url: '/',
                template: '<ui-view/>'
            });

        $urlRouterProvider.otherwise('/');
    };

    run.$inject = [];

    function run(){
        
    };

})();