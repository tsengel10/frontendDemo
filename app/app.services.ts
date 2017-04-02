import * as angular from "angular";

import {groupsService} from "./common-service/groups.service";

export function initServices(app: angular.IModule) {
    app.service("groupsService", groupsService);

}