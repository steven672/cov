<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>

    <body>

        <script src="/assets/js/vendor/js.cookie-2.1.4.min.js"></script>
        <script src="/assets/js/vendor/jwt-decode.min.js"></script>
        <script src="/assets/js/cov/url.js"></script>
        <script>

            var
                accessToken = getHashParameters('access_token'),
                idToken = getHashParameters('id_token')
            ;

            if (accessToken)
            {
                Cookies.set('access_token', accessToken);
                Cookies.set('id_token', idToken);
                window.location = '/session?'
                    + 'access_token=' + accessToken
                    + '&id_token=' + idToken
                ;
            }

        </script>

        If you are not redirected there was an error.

    </body>

</html>