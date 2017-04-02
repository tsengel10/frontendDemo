import * as angular from "angular";
import {Group} from "../models/group.model";
import {GroupsService} from "../common-service/groups.service";

export class GroupsController {

    groups: Group[];
    group: Group;
    hasGroupsToShow: boolean = false;
    isLoading: boolean = false;

    /* @ngInject */
    constructor(private groupsService: GroupsService, private $timeout: angular.ITimeoutService) {}

    showDetail(group: Group): void {
        this.group = group;
    }

    loadMyGroups() {
        if(!this.groups || this.groups.length == 0) {
            this.isLoading = true;
            //This is only for purpose of showing loader
            this.$timeout(() => {
                this.groupsService.getAll().then(this.loadGroups);
                this.isLoading = false;     
            }, 3000);
        }
    }

    showGroups() {
        return this.groups && this.groups.length > 0 ? true : false;
    }

    showGroupDetail() {
        return this.group ? true : false;
    }

    private loadGroups = (groups: Group[]) => {
        this.groups = groups;
    };
  
};