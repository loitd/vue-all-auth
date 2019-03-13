/*
 * Filename: d:\code\src\github.com\loitd\vue-quick-template\src\modules\vue-all-auth\googleAuth.js
 * Path: d:\code\src\github.com\loitd\vue-quick-template\src\modules\vue-all-auth
 * Created Date: Wednesday, March 13th 2019, 6:28:07 pm
 * Author: loi_t
 * 
 * Copyright (c) 2019 Your Company
 */

 let googleAuth = {
     // Define functions
     ggInstallClient: function(){
        // Installing client mean append client script to head (and make sure it loaded)
        console.log("Begin installing gapi ...");
        return new Promise(function(resolve, reject){
            // do something here
            let ggClientScript = document.createElement("script")
            ggClientScript.setAttribute("src", "https://apis.google.com/js/api:client.js")
            // Not handle connect timeout case yet
            // Append the script onto the head element
            // document.head.appendChild(ggClientScript)
            // another way
            document.getElementsByTagName('head')[0].appendChild(ggClientScript)
            // just a log
            console.log("gapi is installed!")
            // using promise and you HAVE TO declare resolve() to announce its done! otherwise all others still wait
            // but you have to wait for sometime for the js to be applied
            setTimeout(function(){
                resolve()
            }, 500)
        });
    },

    ggInitClient: function(configs){
        console.log("Begin gapi initialization ...");
        return new Promise(function(resolve, reject){
            // do something. Do init as: https://developers.google.com/identity/sign-in/web/build-button
            // By default, the fetch_basic_profile parameter of gapi.auth2.init() is set to true, which will automatically add 'email profile openid' as scope.
            // Do not use the Google IDs returned by getId() or the user's profile information to communicate the currently signed in user to your backend server. 
            // Instead, send ID tokens, which can be securely validated on the server.
            // console.log(configs) //--> to check if configs
            // console.log(window.gapi)
            if (configs !== undefined){
                window.gapi.load("auth2", function(){
                    auth2 = window.gapi.auth2.init(configs);
                })
                // Just a log
                console.log("gapi is initialized!")
                // using promise and you HAVE TO declare resolve() to announce its done!
                setTimeout(function(){
                    resolve()
                }, 500)
            } else {
                console.log("Undefined configs for gapi! Initialized failed!")
                reject()
            }
        });
    },

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
    signIn: function(successCallback, errorCallback){
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

    },

    // signOut function
    signOut: function(successCallback, errorCallback){
        window.gapi.auth2.getAuthInstance().signOut().then(function(){
            successCallback()
        }, function(error){
            errorCallback(error)
        })
    },

    // printInfo
    // https://developers.google.com/identity/sign-in/web/people
    printInfo: function(){
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()){
            // All printing should be removed in production.
            // console.log("This is auth2");
            // console.log(window.gapi.auth2);
            // Ok, you signed in
            // console.log("This is ins");
            let ins = window.gapi.auth2.getAuthInstance();
            // console.log(ins);
            //yes
            // console.log("This is googleUser");
            let googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
            // console.log(googleUser);
            //yes
            // console.log("This is profile");
            let profile = googleUser.getBasicProfile();
            // console.log(profile);
            // 
            console.log("Result: ID:"+profile.getId() + "FullName:"+profile.getName()+"Email:"+profile.getEmail()+"Img:"+profile.getImageUrl()+"FamilyName:"+profile.getFamilyName()+"GivenName:"+profile.getGivenName())
        } else {
            console.log("Yes, you haven't logged in yet!")
        }
    },
}

 module.exports = googleAuth;