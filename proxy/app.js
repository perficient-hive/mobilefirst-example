var proxy = require('express-http-proxy');

var authenticated = false;

var app = require('express')();
app.set('authenticated', false);

app.use('/mfjct', proxy('localhost:10080', {
    forwardPath: function(req, res) {
        console.log(req.url);
        return require('url').parse(req.url).path;
    },
    intercept: function(rsp, data, req, res, callback) {
        // rsp - original response from the target
        var authenticated = app.get("authenticated");
        if(req.url == "/DRA/adapters/ApiAdapter/hello" || req.url == "/DRA/apps/services/api/DRA/android/init") {
            console.log("Authenticated:" + authenticated);
            if(!authenticated) {
                /*
                var html  = "<html>";
                html     += "    <head><title>Login</title></html>";
                html     += "    <body>";
                html     += "        <form>";
                html     += "            User name:<br>";
                html     += "            <input type=\"text\" name=\"username\"><br>";
                html     += "            Password:<br>";
                html     += "            <input type=\"text\" name=\"password\">";
                html     += "        </form>";
                html     += "    </body>";
                html     += "</html>";
                */
            
                app.set('authenticated', true);

                res.json({authRequired: true});
            }
            else {
                callback(null,data);
            }
        }
        else {
            //console.log("INT (rsp):");
            //console.log(rsp);
            //console.log(data);
            callback(null,data);
        }
    }
}));

app.get('/login', function (req, res) {
    /*
    var html  = "<html>";
    html     += "    <head><title>Login</title></html>";
    html     += "    <body>";
    html     += "        <form>";
    html     += "            User name:<br>";
    html     += "            <input type=\"text\" name=\"username\"><br>";
    html     += "            Password:<br>";
    html     += "            <input type=\"text\" name=\"password\">";
    html     += "        </form>";
    html     += "    </body>";
    html     += "</html>";
    */

    app.set('authenticated', true);

    res.json({authRequired: true});
});

app.get('/logout', function (req, res) {
    /*
    var html  = "<html>";
    html     += "    <head><title>Login</title></html>";
    html     += "    <body>";
    html     += "    <p>Logout</p>";
    html     += "    </body>";
    html     += "</html>";
    */

    app.set('authenticated', false);

    res.json({logout: true});
});

app.set('port', process.env.PORT || 5000);

// Start server
var server = app.listen(5000, function() {
    console.log("Express is running on port " + app.get('port'));
});
