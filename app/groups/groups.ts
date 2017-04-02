import * as angular from "angular";
import {GroupsController} from "./groups.controller";
const templateUrl = require("./groups.html");

export const groups: angular.IComponentOptions = {
    templateUrl: templateUrl,
    controller: GroupsController,
    controllerAs: "vm",
    bindings: {}
};