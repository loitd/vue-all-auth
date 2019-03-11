# vue-all-auth
Vue.js All Social Authentication
## How it made
I wrote this plugin when completing authentication part of a larger project called [Vue-quick-template](https://github.com/loitd/vue-quick-template) since at this time (Mar-2019), I couldn't find any social authentication plugin for Vue.js suit my need.  
I am glad that this plugin can help you in your projects.
## Installation
```
yarn add -D vue-all-auth
```
## Using
If you use [Vue-quick-template](https://github.com/loitd/vue-quick-template) then I already set it up for you. Just go to `/src/plugins/allauth.js` for initialization.  
If you already have your Vue.js project setup:  
* Create a folder and file `/src/plugins/allauth.js` and at `main.js` add this line:
```
import "./plugins/allauth";
```
* In `src/plugins/allauth.js` add these lines:  
```
import VueAllAuth from "vue-all-auth";
Vue.use(VueAllAuth, { client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com" });
```
