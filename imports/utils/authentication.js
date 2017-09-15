import { Meteor } from 'meteor/meteor';

export default function authentication(userId, token) {
    let UserData = Meteor.users.findOne({ '_id': userId });
    if (UserData) {
        if (!UserData.profile.isActive)
            return 'Your account has been suspended';
        else if (UserMaster.checkToken(token, userId) && UserData.profile.isActive)
            return 'Authentication Pass';
        else
            return 'Session Expired'

    } else {
        return 'User not found'
    }
}