// plugin.js
// import ggButton from 'components/ggButton.vue'
// With google: based on this example https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html

function installClient(){
    // Installing client mean append client script to head (and make sure it loaded)
    console.log("installClient called");
    return new Promise(function(resolve, reject){
        // do something here
        let ggClientScript = document.createElement("script");
        ggClientScript.setAttribute("src", "https://apis.google.com/js/api:client.js");
        // Not handle connect timeout case yet
        // Append the script onto the head element
        document.head.appendChild(ggClientScript);
    });
}

function initClient(config){
    console.log("initClient called");
    return new Promise(function(resolve, reject){
        // do something. Do init as: https://developers.google.com/identity/sign-in/web/build-button
        // By default, the fetch_basic_profile parameter of gapi.auth2.init() is set to true, which will automatically add 'email profile openid' as scope.
        // Do not use the Google IDs returned by getId() or the user's profile information to communicate the currently signed in user to your backend server. 
        // Instead, send ID tokens, which can be securely validated on the server.
        window.gapi.load("auth2", function(){
            auth2 = window.gapi.auth2.init(config);
        });
    });
}

function init(){
    return new Promise(function(resolve, reject){
        if (window.gapi === undefined){
            // windows.gapi is not init
            console.log("gapi is not installed yet! Now install");
            installClient().then(function(){
                // Installed, now init
                return initClient(options)
            }).then(function(){
                // Installed and inited -> resolved
                resolve()
            })
        } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
            // window.gapi is installed but auth2 is not init yet
            console.log("gapi installed but is not init yet! Now init!")
            initClient(options).then(function(){
                // init done. Resolved
                resolve()
            })
        }
    })
}

// signIn function
/* 
    https://developers.google.com/identity/protocols/OAuth2
    Server-side webapp # Javascript client side webapp: https://developers.google.com/identity/protocols/OAuth2UserAgent
    This topo is for client side web app
    Your App                        Google
    ------------request token------------>
    ------------user login & consent----->
    <-----------token---------------------
    ------------Validate token----------->
    <-----------Validation response-------
    ------------Use token to call API---->
*/
function signIn(successCallback, errorCallback){
    // this step happen when all init and installation above done
    // which mean all thing ready to be called
    // // Sample token/code response: 4/-ABYX3-wfXTznLcS6prVHU5mqYbCsTvAbGKKtxw00k559VMVwLIC1Pt_L7Mmpt24bec3bJXpLH2MY1Eoh98Eg6g
    window.gapi.auth2.getAuthInstance().signIn().then(function(googleUser){
        // when success. Do anything you want
        // You can send the authorizationCode to your backend server for further processing, 
        // ex: redirect to the dashboard
        // this.$router.push({ name: 'home' });
        successCallback(googleUser)
    }, function(error){
        // things to do when sign-in fails
        // Sample response: {error: "popup_closed_by_user"}
        // Sample: Object error: "access_denied" __proto__:
        errorCallback(error)
    })

}

// signOut function
function signOut(successCallback, errorCallback){
    window.gapi.auth2.getAuthInstance().signOut().then(function(){
        successCallback()
    }, function(error){
        errorCallback(error)
    })
}

// printInfo
// https://developers.google.com/identity/sign-in/web/people
function printInfo(){
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()){
        console.log(window.gapi.auth2);
        // Ok, you signed in
        let ins = window.gapi.auth2.getAuthInstance();
        console.log(ins);
        //
        let googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
        console.log(googleUser);
        // 
        let profile = googleUser.getBasicProfile();
        console.log(profile);
        console.log("ID:"+profile.getID() + "FullName:"+profile.getName()+"Email:"+profile.getEmail()+"Img:"+profile.getImageUrl())
    } else {
        console.log("Yes, you haven't logged in yet!")
    }
}



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

        // Add or modify global methods or properties.
        Vue.allAuth = function(){
            return {
                init: init, //init function
                signIn: signIn,
                signOut: signOut,
                printInfo: printInfo,
            }
        }
        // console.log(options);

    }
}

module.exports = vueAllAuth;