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
class Controller_SNOW extends Controller
{

    /**
     * Error
     *
     * @access public
     * @return Response
     */
    public function get_index()
    {
        $log = new Model_Log();
        $log->generateAccessLog('snow/index_get');

        return Response::forge(
            View::forge(
                'snow/response',
                array(
                    'response' => "Invalid snow Request: Must use properly formatted POST"
                    )
                )
            );
    }


    /**
     * snow Reflector
     * Pass the exact query forward as it is received, then return the response
     *
     * @access public
     * @return Response
     */
    public function post_index()
    {
        $log = new Model_Log();
        $log->generateAccessLog('snow/index_post');

        ini_set('max_execution_time', 300);

        // Read the variables provided
        $endpoint = Input::post('endpoint', null);      // Required
        $requestType = Input::post('type', 'GET');      // Optional: Default is GET
        $variables = Input::post('variables', null);    // Optional: Associative array
        $username = 'change_api_read';                  //snow username
        $password = 'Password$1';                       //snow paswd
        $snowAddress = "comcastcim.service-now.com";

        $uri =
            'https://' .
            $snowAddress .
            Input::query_string()
        ;

        // Check whether the API endpoint has been specified
        if (!is_null($endpoint))
        {
            $responseCode = null;
            $responseData = null;
            // This try-catch allows us to capture and reflect all good/bad snow attempts
            try
            {
                // Attempt the retrieval of data from snow
                $responseData .=
                    Request::forge(
                        $uri
                        ,
                        'curl'
                        )
                    ->set_option(CURLOPT_USERPWD, $username . ':' . $password)
                    ->set_method($requestType)
                    ->set_params($variables)
                    ->execute()
                ;

                // Set the status code to 200/OK
                // This line will only execute if the snow request above completed
                $responseCode = 200;
            }
            // A RequestException is triggered by an incomplete request (i.e. timeout)
            // A RequestStatusException is triggered when the snow response status is >=404
            // This allows us to reflect errors from snow to the client
            catch (Exception $e)
            {
                if (strstr($e->getMessage(), 'Operation timed out'))
                {
                    // Timeout from snow
                    $responseCode = 408;
                    $responseData = json_encode(
                        array(
                            'message' => $e->getMessage(),
                            'path' => $uri
                        )
                    );
                }
                else
                {
                    // Unhandled error
                    $responseCode = 500; /*$e->getCode();*/
                    $responseData = json_encode(
                        array(
                            'message' => $e->getMessage(),
                            'path' => $uri
                        )
                    );
                }
            }
            finally
            {
                // Return a response including the status code and any data
                return Response::forge(
                    View::forge(
                        'snow/response',
                        array(
                            'response' => $responseData
                            )
                        ),
                        $responseCode,
                        array(
                            'Content-Type','application/json'
                        )
                    )
                ;
            }
        }

    }

}
