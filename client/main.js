import { Meteor } from "meteor/meteor";
import App from "./App.html";

Meteor.startup(() => {
  new App({
    target: document.querySelector("main")
  });
});
