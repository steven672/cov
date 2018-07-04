function calculateEarlierDate
(
    dateEnd = null, // Must be a string in YYYY-MM-DD format
    numDaysEarlier = 0
)
{
    if (dateEnd != null && numDaysEarlier >= 0)
    {
        var
            dateEndTimestamp = (new Date(dateEnd).getTime() / 1000),
            dateStartTimestamp = (dateEndTimestamp - (numDaysEarlier * (24 * 60 * 60))),
            dateStart = new Date(dateStartTimestamp * 1000).toISOString().split('T')[0]
            ;

        return dateStart;
    }
}

// Convert date to the string format YYYY-MM-DD
function convertDateToString(
    date = null
)
{
    // var mm = date.getMonth()+1; // getMonth() is zero-based
    var mm = date.getMonth() + 1; // checked the start date, this minus -1.
    var dd = date.getDate();

    return [date.getFullYear(),
          (mm > 9 ? '' : '0') + mm,
          (dd > 9 ? '' : '0') + dd
         ].join('-');
}

// Convert hour to the string format hh:mm:ss
function convertHoursToHMS(
    hour = null     // An integer or decimal value number of hours on a 24-hour clock (0.0-23.99)
)
{
    var hh = Math.floor(hour / 1);
    var mm = Math.floor((hour % 1) * 60);
    var ss = Math.floor((((hour % 1) * 60) % 1) * 60);

    return [hh , mm , ss].join(':');
}

// Convert second to the string format dd:hh:mm
function convertSecondsToDHM(
    second = null     // An integer or decimal value number of seconds
)
{
    var dd = Math.floor(second / (60*60*24));
    var hh = Math.floor((second%(60*60*24))/(60*60));
    var mm = Math.floor(((second%(60*60*24))%(60*60))/60);

    return [dd, hh, mm]
        .map(v => v < 10 ? "0" + v : v)
        .join(':');
}

// Show a simplified YYYY-MM-DD date for a given UTC date
function formatDate(
    date = null             // The date to format as YYYY-MM-DD, given as Date object
)
{
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day =  date.getUTCDate();
    var year = date.getUTCFullYear();
    date = year + "-" + "0"+month + "-" + day;
    return date;
}

function setDateUTC(
    originalDate = null         // The original date, given as a unix timestamp
)
{
    var originalDateAsObject = new Date(originalDate);
    var referenceDate = new Date();
    originalDateAsObject.setUTCMinutes(referenceDate.getTimezoneOffset());
    return originalDateAsObject;
}

// Verify whether the provided date matches the format YYYY-MM-DD
// Code pulled out from capacity/cdvr/helpers.js
function validDate(
    date = null
)
{
    if (date !== null)
    {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (date.match(regEx) != null)
        {
            // Date is valid
            return true;
        }
    }

    // Report the lack of date provided
    consoleWarnWithModeFlag("NOTICE :: No date specified or date format is incorrect (YYYY-MM-DD)");

    return false;
}
