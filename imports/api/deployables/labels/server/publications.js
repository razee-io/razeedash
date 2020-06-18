/**
* Copyright 2019 IBM Corp. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Labels } from '../labels';
import { requireOrgAccess } from '/imports/api/org/utils.js';

Meteor.publish('labels', function(orgId) {
    check( orgId, String );
    requireOrgAccess(orgId);
    return Labels.find({ orgId: orgId }, {pollingIntervalMs: 1000});
});

Meteor.publish('users.byIds', function(userIds) {
    check( userIds, Array);
    return Meteor.users.find({ _id: {$in: userIds} }, { fields: { 'profile.name': true } });
});
