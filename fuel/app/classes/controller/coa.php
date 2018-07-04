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
class Controller_COA extends Controller
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
        $log->generateAccessLog('coa/index_get');

        return Response::forge(
            View::forge(
                'coa/response',
                array(
                    'response' => "Invalid Request: Must use properly formatted POST"
                    )
                )
            );
    }


    /**
     * COA Reflector
     * Pass the exact query forward as it is received, then return the response
     *
     * @access public
     * @return Response
     */
    public function post_index()
    {
        $log = new Model_Log();
        $log->generateAccessLog('coa/index_post');

        ini_set('max_execution_time', 300);

        // Read the variables provided
        $endpoint = Input::post('endpoint', null);      // Required
        $requestType = Input::post('type', 'GET');      // Optional: Default is GET
        $variables = Input::post('variables', null);    // Optional: Associative array

        $coaAddress = "dev-coa";

        switch (\Fuel::$env)
        {
            case "production-preview-private":
                $coaAddress = "coa-private.vops.comcast.net";
                break;

            case "production-preview-public":
                $coaAddress = "coa-public.vops.comcast.net";
                break;

            case "production-ga":
                $coaAddress = "coa.vops.comcast.net";
                break;
        }

        $uri =
            'http://' .
            $coaAddress .
            Input::query_string()
        ;

        // Check whether the API endpoint has been specified
        if (!is_null($endpoint))
        {
            // This try-catch allows us to capture and reflect all good/bad COA attempts
            try
            {
                // Attempt the retrieval of data from COA
                $responseData =
                    json_decode(Request::forge(
                        $uri
                        ,
                        'curl'
                        )
                    ->set_method($requestType)
                    ->set_params($variables)
                    ->execute())
                ;

                // Set the status code to 200/OK
                // This line will only execute if the COA request above completed
                $responseCode = 200;
            }
            // A RequestException is triggered by an incomplete request (i.e. timeout)
            // A RequestStatusException is triggered when the COA response status is >=404
            // This allows us to reflect errors from COA to the client
            catch (Exception $e)
            {
                if (strstr($e->getMessage(), 'Operation timed out'))
                {
                    // Timeout from COA
                    $responseCode = 408;
                    $responseData = array(
                        'message' => $e->getMessage(),
                        'path' => $uri
                    );
                }
                else
                {
                    // Unhandled error
                    $responseCode = 500; /*$e->getCode();*/
                    $responseData = array(
                        'message' => $e->getMessage(),
                        'path' => $uri
                    );
                }
            }
            finally
            {
                // Return a response including the status code and any data
                $response = Response::forge(
                    View::forge(
                        'coa/response',
                        array(
                            'response' => $responseData
                            )
                        ),
                    $responseCode
                );
                $response->set_header('Content-Type', 'application/json');
                return $response;
            }
        }

    }

}
