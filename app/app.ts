import * as angular from "angular";
/* tslint:disable:no-string-literal */
window["ngRoute"] = "ngRoute"; // To map angular-route via Webpack externals
window["ngAria"] = "ngAria"; // To map angular-aria via Webpack externals

import "angular-route";
import "angular-aria";
import "angulartics";

import {initRoutes} from "./app-routes/app.routes";
import {initComponents} from "./app.components";
import {initServices} from "./app.services";
import {initConfig} from "./app.config";

require("./app.scss");

const app = angular.module("App", [
    "ngRoute",
    "ngAria",
    "angulartics"
]);

// Initialize Angular constants based on app-config.json
// CONFIG is injected at compile-time by webpack.DefinePlugin
declare const CONFIG: Object;
Object.keys(CONFIG).forEach(key => app.constant(key, CONFIG[key]));

initRoutes(app);
initComponents(app);
initServices(app);
initConfig(app);

export default app;
export const ng = angular;
