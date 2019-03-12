# vue-all-auth
Vue.js All Social Authentication
# Sponsors & Backers
Vue.js All Auth is a MIT-based open source project. If you'd like to support me please consider:
[Become a backer or sponsor on Patreon](https://www.patreon.com/loitd)
[One time donation via Paypal](https://www.paypal.me/loitd)
## How it made
I wrote this plugin when completing authentication part of a larger project called [Vue-quick-template](https://github.com/loitd/vue-quick-template) since at this time (Mar-2019), I couldn't find any social authentication plugin for Vue.js suit my need.  
I am glad that this plugin can help you in your projects.
## Installation
```
yarn add -D vue-all-auth
```
If you have old version and want to update to new released version: Using the same command, `yarn` will automatically pull latest version for you.
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
Vue.allAuth().init();
```
