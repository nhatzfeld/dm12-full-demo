// REQURE DEPENDENCIES
require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");
const path = require("path");
// REQUIRE CONTROLLER FILES, DESTRUCTURE THE FUNCTIONALITY WE NEED
const { getUser, logout } = require(`${__dirname}/controllers/usersCtrl`);
const {
  getProducts,
  addToCart
} = require(`${__dirname}/controllers/productsCtrl`);

// CONNECT TO DB WITH MASSIVE
massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));

// DECLARE PORT
const port = 3001;

// APP DECLARATION
const app = express();

// FOR HOSTING
// app.use(express.static(`${__dirname}/../build`));

// MIDDLEWARES
app.use(cors());
app.use(json());

// SESSION MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000
    }
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientSecret: process.env.CLIENT_SECRET,
      clientID: process.env.CLIENT_ID,
      callbackURL: "/auth"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      console.log(profile);
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .addUserByAuthId([profile.id, profile.displayName])
              .then(res => done(null, res[0]));
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

// EDIT USER
passport.serializeUser((user, done) => {
  done(null, user);
});

// PUT USER ON REQ OBJECT AS REQ.USER
passport.deserializeUser((user, done) => {
  done(null, user);
});

// ENDPOINTS

app.get("/api/products", getProducts);
app.post("/api/cart/:id", addToCart);

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "/auth"
  })
);

app.get("/logout", logout);

app.get("/api/me", getUser);

// FOR HOSTING
// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

// LISTENING ON PORT
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
