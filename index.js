/*
 * Filename: modules\vue-all-auth\index.js
 * Path: modules\vue-all-auth
 * Created Date: Monday, March 11th 2019, 4:04:14 pm
 * Author: loitd
 * 
 * Copyright (c) 2019 LOITD
 */

// plugin.js
// import ggButton from 'components/ggButton.vue'
// With google: based on this example https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html
const FBAuth = require("./facebookAuth")
const GGAuth = require("./googleAuth")


// This exports the plugin object.
let vueAllAuth = {
    // https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8
    // https://vuejs.org/v2/guide/plugins.html
    // The install method will be called with the Vue constructor as the first argument, along with possible options
    // How to call - Without options Vue.use(yourPlugin)
    // With options Vue.use(yourPlugin, {someOption: true})
    
    install: function(Vue, options){
        // Add a component or directive to your plugin, so it will be installed globally to your project.
        // Vue.component('ggButton', ggButton)

        // Add or modify global methods or properties.
        // Vue.yourMethod = (value) => value

        // Add `Vue.mixin()` to inject options to all components.
        // Vue.mixin({
        //     // Add component lifecycle hooks or properties.
        //     created() {
        //     console.log('Hello from created hook!')
        //     }
        // })

        // Add Vue instance methods by attaching them to Vue.prototype.
        // Vue.property.$myProperty = 'This is a Vue instance property.'
        // pass configs from install function to allAuth()

        // Add or modify global methods or properties.
        Vue.allAuth = function(){
            // Assign configs as options
            configs = options
            return {
                // return all available providers
                google: function(){
                    return {
                        // return all methods for google provider
                        init: function(){
                            // return a promise for init function
                            return new Promise(function(resolve, reject){
                                if (window.gapi === undefined){
                                    // windows.gapi is not init
                                    console.log("Begin allAuth init() for Google! Now install first")
                                    GGAuth.ggInstallClient().then(function(){
                                        // Installed, now init
                                        return GGAuth.ggInitClient(configs.google)
                                    }).then(function(){
                                        // Just a log
                                        console.log("gapi is installed and initialized!")
                                        // Installed and inited -> resolved
                                        resolve()
                                    })
                                } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
                                    // window.gapi is installed but auth2 is not init yet
                                    console.log("gapi installed but is not init yet! Now init!")
                                    GGAuth.ggInitClient(configs).then(function(){
                                        console.log("gapi is installed and initialized!")
                                        // init done. Resolved
                                        resolve()
                                    })
                                }
                            })
                        }, //init function
                        signIn: GGAuth.signIn,
                        signOut: GGAuth.signOut,
                        printInfo: GGAuth.printInfo,
                    }
                }, //google provider
                facebook: function(){
                    return {
                        init: function(){
                            return new Promise(function(resolve, reject){
                                if (window.FB === undefined){
                                    console.log("Begin allAuth init() for FB! Now install first")
                                    FBAuth.fbInstallClient().then(function(){
                                        // Installed, now init
                                        return FBAuth.fbInitClient(configs.facebook)
                                    }).then(function(){
                                        console.log("FBapi is installed and initialized!")
                                        resolve()
                                    })
                                }
                            })
                        }, //init
                        signIn: FBAuth.fbSignIn,
                    }
                },
                twitter: function(){},
                github: function(){},
            }
        }
        // console.log(options);

    }
}

// Easier for testing with older version
module.exports = vueAllAuth;