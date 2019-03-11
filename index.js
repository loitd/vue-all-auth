// plugin.js
// import ggButton from 'components/ggButton.vue'

function installClient(){
    console.log("installClient called");
}

// This exports the plugin object.
export default{
    // https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8
    // https://vuejs.org/v2/guide/plugins.html
    // The install method will be called with the Vue constructor as the first argument, along with possible options
    // How to call - Without options Vue.use(yourPlugin)
    // With options Vue.use(yourPlugin, {someOption: true})
    install (Vue, options){
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

        // Add or modify global methods or properties.
        Vue.allAuth = function(){
            return {
                init: function(){
                    return new Promise(function(resolve, reject){
                        if (window.gapi === undefined){
                            // windows.gapi is not init
                            console.log("gapi is not installed yet!");
                            installClient();
                        } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
                            // window.gapi is installed but auth2 is not init yet
                            console.log("gapi is not init yet!")
                        }
                    })
                } //init function
            }
        }
        console.log(options);

    }
}