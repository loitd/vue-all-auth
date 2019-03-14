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
Vue.use(VueAllAuth, { 
    google: {
        // keys for google
        client_id: "YOUR_GG_APP_ID.apps.googleusercontent.com", 
        scope: "profile email",
    }, 
    facebook: {
        // keys for fb
        appId: "YOUR_FB_APP_ID",
        cookie: true,
        xfbml: true,
        version: "v3.2",
    },
    twitter: {
        // keys for twitter
    },
    github: {
        // keys for github
    }
    
});
Vue.allAuth().google().init();
Vue.allAuth().facebook().init();
```
* Inside Vue.js component file:
```
# Template part
<!-- Google login button -->
<b-form-group>
    <b-button type="submit" variant="danger" @click="ggSignIn"  style="min-width: 15rem;">
        <font-awesome-icon :icon="['fab', 'google']" class="mr-1"/>
        Continue with Google
    </b-button>
</b-form-group>
```
Javascript part:  
```
import Vue from "vue";
export default {
    name: "SocialLoginForm",
    methods: {
        ggSignIn: function (event) {
            // Prevent default action
            event.preventDefault()
            // console.log("Begin google authentication!");
            Vue.allAuth().google().init()
            // console.log("This is this before calling allAuth(): ");
            let that = this
            Vue.allAuth().google().signIn(function (googleUser) {
                // console.log("This is googleUser in SocialLoginForm: "+googleUser);
                Vue.allAuth().google().printInfo() //just to check what you received
                // console.log("This is this in SocialLoginForm: ");
                // console.log(this); //--> at this time, this is undefined, that will be a Vue instance
                that.$router.push("/")
            }, function (error) {
                console.log("Something went wrong!");
                console.log(error);
            })
        },
    }
}
```
