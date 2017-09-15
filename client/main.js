import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.helpers({
    info() {
        return JSON.stringify({ base: Meteor.absoluteUrl(), graphql: Meteor.absoluteUrl()+'gql' });
    }
});