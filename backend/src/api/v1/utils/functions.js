
/**
 * 
 * /utils/functions.js
 * 
 * @description:: Globally used functions
 * 
 */

function checkInvalid(req, res, /*allowedStrings = []*/) {
    try {
        //let array = new Array(allowedStrings.length);
        let ret = true;
        let value = req.body || req.params || req.query;
        if(!value) {
            res.status(201).send({ msg: "Invalid Options."}).res.end();
            ret = false;
            return;
        }
        
        try {
            Object.keys(value).forEach(function(i) {
                if(/*value[i] == array[i] && */hasWhiteSpace(value[i]))
                    {
                        res.status(201).send({ msg: "Dont have white spaces."});
                        ret = false;
                        return;
                    }
                
                if(!checkIfAlphanumericString(value[i]))
                    {
                        res.status(201).send({ msg: "Only Alphabetic letters are allowed."});
                        ret = false;
                        return;
                    }
            })
        } catch(_) {
            ret = false;
            return;
        }

        return ret;
    } catch(err) {
        return console.log(err)
    }
    
}

function checkIfAlphanumericString(s) {
    if(s)
        return (/^[a-z0-9]+$/i).test(s);
    else 
        return console.log("checkIfAlphanumericString: Invalid string.")
}

function hasWhiteSpace(s) {
    if(s)
        return s.indexOf(' ') >= 0;
        else 
            return console.log("hasWhiteSpace: Invalid string.")
}

function checkIfValidEmail(s) {
    if(s)
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(s);
        else 
            return console.log("checkIfValidEmail: Invalid string.")
}

function escapeHtml (string) {
    try {
        var matchHtmlRegExp = /["'&<>]/;
        var str = '' + string
        var match = matchHtmlRegExp.exec(str)
    
        if (!match) {
            return str
        }
    
        var escape
        var html = ''
        var index = 0
        var lastIndex = 0
    
        for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
            case 34: // "
                escape = '&quot;'
                break
            case 38: // &
                escape = '&amp;'
                break
            case 39: // '
                escape = '&#39;'
                break
            case 60: // <
                escape = '&lt;'
                break
            case 62: // >
                escape = '&gt;'
                break
            default:
                continue
            }
    
            if (lastIndex !== index) {
                html += str.substring(lastIndex, index)
            }
    
            lastIndex = index + 1
            html += escape
        }
    
        return lastIndex !== index
            ? html + str.substring(lastIndex, index)
            : html
    } catch(err) {
        return console.log(err)
    }
}

export default {
    hasWhiteSpace,
    checkInvalid,
    checkIfValidEmail,
    checkIfAlphanumericString,
    escapeHtml
}