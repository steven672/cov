<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>

    <body>

        <script src="/assets/js/vendor/oidc-client-1.3.0.min.js"></script>
        <script src="/assets/js/vendor/js.cookie-2.1.4.min.js"></script>
        <script src="/assets/js/vendor/jwt-decode.min.js"></script>
        <script src="/assets/js/cov/url.js"></script>
        <script>

            var ssoConfig =
            {
                authority: "./",
                client_id: "cov",
                redirect_uri: "http://dev-cov/callback",
                response_type: "id_token token",
                scope:"openid profile",
                post_logout_redirect_uri : "http://dev-cov/",
            };

            if (!Cookies.get('access_token'))
            {
                (new Oidc.UserManager(ssoConfig)).signinRedirect();
            }
            else
            {
                var token = jwt_decode(Cookies.get('access_token'));
                console.log(token);
                console.log(token.COMCAST_FNAME + ' ' + token.COMCAST_LNAME + ' is logged in.');
            }

        </script>

        <center>

            Valid credentials are required; you will be redirected to login.<br>
            <br>
            <button onclick="javascript:function(){(new Oidc.UserManager(ssoConfig)).signinRedirect();};">Login</button>

        </center>

    </body>

</html>