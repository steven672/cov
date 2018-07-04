<?php
return array(
	'_root_'  => 'cov/index',  // The default route
	'_404_'   => 'cov/404',    // The main 404 route

    // An API query cache/reflector for COA requests
    'coa(:any)' =>
    'coa/index$1',

    // An API query cache/reflector for COA requests
    'snow(:any)' =>
    'snow/index$1',

    // 'cov' =>
    // 'cov/index',

    // callback and sessioin for sso
    'callback' =>
    'cov/callback',

    'session' =>
    'cov/session',

    // sets for frontend environment
    'jsenv' =>
    'cov/jsenv'
);
