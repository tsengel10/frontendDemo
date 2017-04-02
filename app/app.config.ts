import * as angular from "angular";

export function initConfig(app: angular.IModule) {
    app.config(($httpProvider: angular.IHttpProvider) => {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push(($q: angular.IQService, ORIGIN: string) => {
            return {
                "request": function (config) {
                    if (/^\//.test(config.url)) {
                        config.url = `${ORIGIN}${config.url}`;
                    }
                    return config;
                }
            };
        });
    });
}