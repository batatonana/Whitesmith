const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./database");

passport.use(
  new LocalStrategy(function (username, password, done) {
    UserModel.findOne({ username: username }, function (err, user) {
      console.log(username)
      console.log(password)
      console.log(user)
      if (err) {
        console.log(1)
        return done(err);
      } // Error
      if (!user) {
        console.log(2)
        return done(null, false);
      } // Invalid usename
      if (user.password != password) {
        console.log(3)
        return done(null, false);
      } // Invalid password
      console.log(4)
      return done(null, user); // Sucess login
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});
