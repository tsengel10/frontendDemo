import * as angular from "angular";
import "angular-route";

export function initRoutes(app: angular.IModule) {
    /* @ngInject */
    app.config(function($routeProvider: angular.route.IRouteProvider) {
        
        $routeProvider
            .when("/groups", {
                template: "<groups></groups>",
                resolve: {
                }
            })
            .otherwise({ redirectTo: "/" });
    });
}