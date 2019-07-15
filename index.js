const expressEdge = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const aboutPageController = require("./controllers/aboutPage");
const messagePageController = require("./controllers/messagePage");
const storeSubscriptionsController = require("./controllers/storeSubscriptions");
const subscriptionsController = require("./controllers/subscriptions");
const loginPageController = require("./controllers/loginPage");
const registerPageController = require("./controllers/registerPage");
const storeUserController = require("./controllers/storeUser");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const adminpanelController = require("./controllers/adminpanel");
const privacyPolicyController = require("./controllers/privacyPolicy");
const tandcController = require("./controllers/tandc")

const app = new express();
mongoose.connect("mongodb://localhost/woxen");

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./middleware/auth");

app.get("/", homePageController);
app.post("/posts/store", storePostController);
app.get("/about", aboutPageController);
app.get("/message",auth, messagePageController);
app.post("/storeSubscriptions",storeSubscriptionsController);
app.get("/subscription",auth, subscriptionsController);
app.get("/login",loginPageController);
app.get("/register-adxinteractive",registerPageController);
app.post("/storeUser",storeUserController);
app.post("/loginUser",loginUserController);
app.get("/logout", auth, logoutController);
app.get("/adminpanel",auth,adminpanelController);
app.get("/privacyPolicy",privacyPolicyController);
app.get("/termsandconditions",tandcController);





app.listen(process.env.PORT || 80, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
