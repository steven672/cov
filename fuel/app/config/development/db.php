<?php
/**
 * The development database settings. These get merged with the global settings.
 */

return array(
    'cov' => array(
        'type' => 'pdo',
        'connection'  => array(
            'compress'   => false,
            'dsn'        => 'mysql:host=perf-srv-o.vops.comcast.net;dbname=cov',
            'password'   => 'xmD9nshMPPD!f_36',
            'persistent' => false,
            'username'   => 'vopsp_write',
        ),
        'charset'        => 'utf8',
        'enable_cache'   => true,
        'profiling'      => false,
        'readonly'       => false,
        'table_prefix'   => '',
    ),
);