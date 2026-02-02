const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (!user) {
            user = await User.create({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                socialId: profile.id,
                provider: 'google'
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails'] 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;

        let user = await User.findOne({ where: { email: email } });

        if (!user) {
            user = await User.create({
                fullName: profile.displayName,
                email: email,
                socialId: profile.id,
                provider: 'facebook'
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
  }
));