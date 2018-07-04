<?php

class Model_Log extends Model
{
    // Records when a user access a route
    public function generateAccessLog(
        $route = null
    )
    {
        $identity = Session::get('identity');

        $insert = DB::insert('log_access');
        $insert->set(
            array(
                'timestamp' => DB::expr('now()'),
                'clientIp' => $_SERVER['REMOTE_ADDR'],
                'hostName' => $_SERVER['SERVER_NAME'],
                'hostIp' => $_SERVER['SERVER_ADDR'],
                'route' => $route,
                'ssoIdentified' => ($identity === null ? 0 : 1),
                'ssoUsername' => ($identity === null ? null : $identity->COMCAST_USERNAME)
            )
        );
        $insert->execute('cov');
    }
}