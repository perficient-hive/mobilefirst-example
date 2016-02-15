function wlCommonInit(){
    /*
     * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
     * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
     * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
     *    
     *    WL.Client.connect({
     *            onSuccess: onConnectSuccess,
     *            onFailure: onConnectFailure
     *    });
     *     
     */
    
    // Common initialization code goes here
    /*
    WL.Client.connect({
        onSuccess :function(){ console.log("****** WL.Client.connect: success ********")},
        onFailure :function(){ console.log("****** WL.Client.connect: fail ********");},
        timeout :5000
    });
    */
    
}

function wlClientConnect() {
    WL.Client.connect({
        onSuccess :function(){ console.log("****** WL.Client.connect: success ********")},
        onFailure :function(){ console.log("****** WL.Client.connect: fail ********");},
        timeout :5000
    });
}

function login() {
    $.ajax({url: "http://192.168.43.211:5000/login", success: function(result){
        alert("Login success");
    }});
}

function logout() {
    $.ajax({url: "http://192.168.43.211:5000/logout", success: function(result){
        alert("Logout success");
    }});
}
