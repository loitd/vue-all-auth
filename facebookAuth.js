/*
 * Filename: d:\code\src\github.com\loitd\vue-quick-template\src\modules\vue-all-auth\facebookAuth.js
 * Path: d:\code\src\github.com\loitd\vue-quick-template\src\modules\vue-all-auth
 * Created Date: Wednesday, March 13th 2019, 5:58:27 pm
 * Author: loi_t
 * 
 * Copyright (c) 2019 Your Company
 */
let facebookAuth = {
    // Define functions
    fbInstallClient: function(){
        // Installing client mean append client script to head (and make sure it loaded)
        console.log("Begin installing FBapi ...");
        return new Promise(function(resolve, reject){
            // do something here
            let fbClientScript = document.createElement("script")
            // fbClientScript.setAttribute("src", "https://connect.facebook.net/en_US/sdk.js")
            fbClientScript.setAttribute("src", "https://connect.facebook.net/pl_PL/all.js")
            // Not handle connect timeout case yet
            // Append the script onto the head element
            // document.head.appendChild(ggClientScript)
            // another way
            document.getElementsByTagName('head')[0].appendChild(fbClientScript)
            // just a log
            console.log("FBapi is installed!")
            // using promise and you HAVE TO declare resolve() to announce its done! otherwise all others still wait
            // but you have to wait for sometime for the js to be applied
            setTimeout(function(){
                resolve()
            }, 500)
        });
    },

    fbInitClient: function(configs){
        console.log("Begin FBapi initialization ...");
        return new Promise(function(resolve, reject){
            // do something. Do init as: https://developers.facebook.com/apps/418176095610807/fb-login/quickstart/
            // By default, the fetch_basic_profile parameter of gapi.auth2.init() is set to true, which will automatically add 'email profile openid' as scope.
            // Do not use the Google IDs returned by getId() or the user's profile information to communicate the currently signed in user to your backend server. 
            // Instead, send ID tokens, which can be securely validated on the server.
            // console.log(configs) //--> to check if configs
            // console.log(window.gapi)
            if (configs !== undefined){
                window.fbAsyncInit = function(){
                    FB.init(configs)
                }
                // Just a log
                console.log("FBapi is initialized!")
                // using promise and you HAVE TO declare resolve() to announce its done!
                setTimeout(function(){
                    resolve()
                }, 500)
            } else {
                console.log("Undefined configs for FBapi! Initialized failed!")
                reject()
            }
        });
    },
    fbSignIn: function(successCallback, errorCallback){
        // first check current status of user
        // More about promise: https://ehkoo.com/bai-viet/tat-tan-tat-ve-promise-va-async-await
        // Basics: https://viblo.asia/p/object-trong-javascript-nhung-dieu-can-biet-V3m5W2JWlO7
        return new Promise(function(resolve, reject){
            // Async here
            FB.getLoginStatus(function(response){
                if (response.status === "connected"){
                    // connected - Người đó đăng nhập Facebook và đã đăng nhập ứng dụng của bạn.
                    console.log("Already signed in and connected.")
                    console.log(response)
                    // Ngược lại, dùng `resolve()` để trả dữ liệu về cho `.then()`
                    resolve(response)
                } else {
                    // then not_authorized or unknown 
                    FB.login(function(response){
                        if (response.status === "connected"){
                            // connected - Người đó đăng nhập Facebook và đã đăng nhập ứng dụng của bạn.
                            console.log("Signed in and connected.")
                            console.log(response)
                            resolve(response)
                        } else {
                            console.log("Something went wrong while logging in"+response.status)
                            console.log(response)
                            reject(response)
                        }    
                    }, {scope: 'public_profile,email'})
                }
            })
        })
    }
}

// You can't mix import and module.exports. In the import world, you need to export things. SO
// See this image: https://i.stack.imgur.com/5WgFJ.png
// https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/
// ------------------------------------------------------------------------------
// CommonJS: require + module.exports
// ES6: import + export
// ------------------------------------------------------------------------------
// Change this
module.exports = facebookAuth;

// To this
// export default foo;
// the couple (require/module.exports) by default anyway
// Here: export default foo; ----> In caller: import {fbInstallClient} from "./facebookAuth"; for 
// Here: module.exports = facebookAuth; ----> In caller: const fb = require("./facebookAuth"); for 
// I hate require so I will use ES6.
// export default facebookAuth;