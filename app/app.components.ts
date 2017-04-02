import * as angular from "angular";
import {groups} from "./groups/groups";

export function initComponents(app: angular.IModule) {
    app.component("groups", groups);

}