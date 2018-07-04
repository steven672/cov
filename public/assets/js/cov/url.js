function getHashParameters(
    paramName = null
)
{
    var
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        query  = window.location.hash.substring(1)
        search = /([^&=]+)=?([^&]*)/g,
        urlParams = {}
    ;

    while (match = search.exec(query))
    {
       urlParams[decode(match[1])] = decode(match[2]);
    }

    if (paramName !== null)
    {
        if (urlParams.hasOwnProperty(paramName))
        {
            return urlParams[paramName];
        }
        else
        {
            return false;
        }
    }

    return urlParams;
}
