import * as express from "express";
import * as api from "./api";

export const register = (app: express.Application) => {
  const oidc = app.locals.oidc;

  // route for the default page
  app.get("/", (req: any, res) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    res.render("index", { isAuthenticated: req.isAuthenticated(), user });
  });

  // define a secure route handler for the login page that redirects to /guitars
  app.get("/login", oidc.ensureAuthenticated(), (req: any, res) => {
    res.redirect("/guitars");
  });

  // a route to handle the logout action
  app.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect("/");
  });

  // define a secure route handler for the guitar page
  app.get("/guitars", oidc.ensureAuthenticated(), (req: any, res) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    res.render("guitars", { isAuthenticated: req.isAuthenticated(), user });
  });
  api.register(app);
};
