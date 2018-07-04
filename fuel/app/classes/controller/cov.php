<?php
/**
 * Fuel is a fast, lightweight, community driven PHP5 framework.
 *
 * @package   Fuel
 * @version   1.8
 * @author    Squiz Pty Ltd <products@squiz.net>
 * @license   MIT License
 * @copyright 2010 Squiz Pty Ltd (ABN 77 084 670 600)
 * @link      http://fuelphp.com
 */

/**
 * The Welcome Controller.
 *
 * A basic controller example.  Has examples of how to set the
 * response body and status.
 *
 * @package app
 * @extends Controller
 */
class Controller_COV extends Controller
{

    /**
     * COV
     *
     * @access public
     * @return Response
     */
    public function get_index()
    {
        $log = new Model_Log();
        $log->generateAccessLog('cov/index');

        return Response::forge(View::forge('cov/index'));
    }


    /**
     * SSO Callback
     *
     * @access public
     * @return Response
     */
    public function get_callback()
    {
        $log = new Model_Log();
        $log->generateAccessLog('cov/callback');

        return Response::forge(View::forge('cov/callback'));
    }


    /**
     * Javascript Environment Variables
     *
     * @access public
     * @return Response
     */
    public function get_jsenv()
    {
        $log = new Model_Log();
        $log->generateAccessLog('cov/jsenv');

        return Response::forge(
            View::forge('cov/jsenv'),
            200,
            array(
                'Content-Type','text/javascript'
            )
        );
    }


    /**
     * SSO Login
     *
     * @access public
     * @return Response
     */
    public function get_login()
    {
        $log = new Model_Log();
        $log->generateAccessLog('cov/login');

        return Response::forge(View::forge('cov/login'));
    }

    /**
     * Ingest SSO details and store in session variables for logging
     *
     * @access public
     * @return Response
     */
    public function get_session()
    {
        $accessToken = Input::get('access_token', null);
        $idToken = Input::get('id_token', null);

        $identity = null;

        if ($accessToken !== null)
        {
            $identity =
                JWT::decode(
                    $jwt = $accessToken,
                    $key = null,
                    $verify = false
                )
            ;
        }

        Session::set('access_token', $accessToken);
        Session::set('id_token', $idToken);
        Session::set('identity', $identity);

        return Response::redirect('/');
    }


    /**
     * The 404 action for the application.
     *
     * @access public
     * @return Response
     */
    public function action_404()
    {
        $log = new Model_Log();
        $log->generateAccessLog('cov/404');

        return Response::forge(Presenter::forge('cov/404'), 404);
    }


}
