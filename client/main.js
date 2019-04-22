import { Meteor } from "meteor/meteor";
import App from "./App.svelte";

Meteor.startup(() => {
  new App({
    target: document.querySelector("main")
  });
});
