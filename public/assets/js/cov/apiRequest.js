/**
* Build and initiate new request. Caching is handled automatically.
*/
var ApiRequest = function (
    apiQuery,
    itemId = null,
    reflector = 'coa'
)
{
    this.query = apiQuery;
    this.data = false;
    this.parsed_data = false;
    this.complete = false;
    this.failed = false;
    this.request = $.post(
        '/' + reflector             // The /coa endpoint is the only important part
         + '/?'                     // Appending the query string is for debugging only
                                    // Using the /? here cleans up the debugigng console
        + apiQuery,                 // Makes it easy to ID each network call (ignored by endpoint)
                                    // Without this appended, each call looks like a generic "coa" call
        {
            endpoint: apiQuery
            // type: 'GET'
            // variables: ...
        }
    ).done((data) => {
        this.complete = true;
        this.data = data;
        if (data != null)
        {
            // Attempt to parse the data returned from the server, assuming it is JSON
            try
            {
                // Store the resulting API data
                this.parsed_data = data;
                consoleDebugWithModeFlag('ApiRequest :: Query response parsed (see following debug line) : ' + this.query);
                // consoleDebugWithModeFlag(JSON.stringify(this.parsed_data));
            }
            catch (e)
            {
                this.parsed_data = null;
                consoleErrorWithModeFlag('ERROR :: ApiRequest :: Unexpected or improperly formatted JSON data returned (see following debug line) : ' + this.query + ' (ID: ' + itemId + ')');
                // consoleWarnWithModeFlag(data);

                loadingScreenFinish(
                    itemId,
                    succeeded = false
                );
            }
        }
    }).fail((xhr, status) => {
        this.failed = true;
        // Report the failed API query
        consoleErrorWithModeFlag("ERROR :: API query failed :: " + this.query + ' (ID: ' + itemId + ')');

        loadingScreenFinish(
            itemId,
            succeeded = false
        );
    });
};


/**
* Add a success handler to the request
*/
ApiRequest.prototype.done = function (success) {
    this.request.done(this.wrapSuccess(success));
    return this;
};


/**
* Wrap success handler so it can be used with either cached or callback data
*/
ApiRequest.prototype.wrapSuccess = function (success) {
    return (data) => {
        var processedData;
        // Check whether the API returned anything useful
        if (this.isComplete() && this.parsed_data !== false)
        {
            processedData = this.parsed_data;
        }
        else if (data != null)
        {
            processedData = JSON.parse(data);
        }
        else
        {
            // Report the failed API query
            return consoleErrorWithModeFlag("*** FAILED LOADING QUERY :: " + this.query);
        }
        // Report the failed API query
        consoleLogWithModeFlag("QUERY LOADED :: " + this.query);
        // Execute the user-provided function, if any, and pass the API response as a usable JS object
        if (isFunction(success))
        {
            success(processedData);
        }
        else
        {
            return consoleErrorWithModeFlag("*** SUCCESS HANDLER IS NOT A FUNCTION :: " + this.query);
        }
    };
};


/**
* Is this request complete
*/
ApiRequest.prototype.isComplete = function () {
    return this.complete;
};


/**
* Is this request failed
*/
ApiRequest.prototype.isFailed = function () {
    return this.failed;
};

// Abstraction of all common API query behavior, data sanitization, and error reporting
// This is pulled out from capacity/cdvr/loadData.js (useful more broadly)
// Relies on apiRequest.js
function loadDataApiQuery(
    apiQuery = null,
    // Required: This is just the suffix, such as '/api/cdvr/legacy/cs/sites/2017-01-14' -- instead of 'http://dev-ccm-php//api/cdvr/legacy/cs/sites/2017-01-14'
    success = function (){},
    // Optional: A function that will be run upon a successful API response
    itemId = null,
    // Optional: An ID of an item to refer to on the loading screen,
    reflector = 'coa'
)
{
    // DEBUG
    consoleInfoWithModeFlag("QUERY :: " + apiQuery);

    // Check if a request has already been initiated for this key
    if (apiQuery !== '' && typeof covApiData[apiQuery] !== 'undefined')
    {
        consoleDebugWithModeFlag("SHARED HANDLE :: " + apiQuery);
        return covApiData[apiQuery].done(success);
    }

    // Initiate an AJAX request to the API using the specified query
    // and store the XHR handle in the cache until we get a response
    covApiData[apiQuery] = new ApiRequest(apiQuery, itemId,reflector).done(success);
    return covApiData[apiQuery];
}


