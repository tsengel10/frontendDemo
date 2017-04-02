import * as angular from "angular";
import {Group} from "../models/group.model";
import {ApiUrl} from "../models/app-config.model";

export interface GroupsInit {
    groups?: Group[];
}

export interface GroupsService {
    getAll: () => angular.IPromise<Group[]>;
}

interface GroupsResponse { data: Group[];}

/* @ngInject */
export function groupsService(API_URL: ApiUrl, $http: angular.IHttpService, $q: angular.IQService): GroupsService {

    return {
        getAll: (): angular.IPromise<Group[]> => {
                return $http.get(`${API_URL.groups}`).then((response:GroupsResponse) => {
                    return response.data;
                }, (errorResponse) => {
                    if (errorResponse && errorResponse.status === 404) {
                        return [];
                    } else {
                        return $q.reject(errorResponse);
                    }
                });
            
        }
    };
    
}