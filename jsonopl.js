/*
    JSON stringify for OPL
    Based on the JSON2 library by Douglas Crockford

    For the moment the stringify'er can handle the basic datatypes in OPL
    If any more of them should be needed, they can be added easily
    ToDo: if tuple's use identifier, use it as object key
*/

function str(key, holder) {
    var gap = '';
    var indent = '';
    var i;
    var k;
    var v;
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];
    var type = ""+typeof(value);

    if (type == "string") { // there's a reason we don't coerce type
        return quote(value);
    } else if (type == "IloTuple") {
        return quote(String(value));
    } else if (type == "number" || type == "boolean" || type == "null" || type == "IloNumVar" || type == "IloNumExpr") {
        return String(value);
    } else {
        if (type.indexOf("IloMap") != -1) { // OPL appears to have an undocumented datatype 'IloMap_sub'
            var temp = new Object();
            for (k in value) {
                temp[k] = value[k];
            }                
            value = temp;

        } else if (type == "IloTupleSet") {
            var temp = new Array();
            for (k in value) {
                temp[temp.length] = k;
            }
            value = temp;
        }

        if (!value) {
            return 'null';
        }

        if (typeof (value) != "object") {
            writeln ("UNRECOGNIZED:" + typeof(value));
            return "null";
        }

        gap += indent;
        partial = new Array();

        if (value.reverse && value.sort) {
            length = value.length;
            for (i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || 'null';
            }

            v = partial.length == 0
                ? '[]'
                : gap
                ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                : '[' + partial.join(',') + ']';
            gap = mind;
            return v;
        }

        for (k in value) {
            if (k=="toString") // where did you come from?
                continue;

            v = str(k, value);
            if (v) {
                partial[partial.length] = quote(k) + (gap ? ': ' : ':') + v;
            }
        }

        v = partial.length == 0
            ? '{}'
            : gap
            ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
            : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
}


function stringify (value) {
        var tobj = new Object();
        var tstr = '';
        tobj[tstr] = value;
        return str('', tobj);
}

// there's no such thing as lambda's
function quote_anon(a) {
    if (a == '"')
        return '\\"';
    if (a == '\b')
        return '\\b';
    if (a == '\n')
        return '\\n';
    if (a == '\f')
        return '\\f';
    if (a == '\t')
        return '\\t';
    if (a == '\\')
        return '\\\\';

    // this could actually return a nice hexencoded unicode character
    // then again, I've already wasted enough time :)
    return '?';
}

// our primitive RegExp replacement...
function testescapable(ch) {
    var diddle = ch+"";
    var cc = diddle.charCodeAt(0);
    if (cc == 173 || cc == 1807 || cc == 6068 || cc == 6069 || cc == 65519 || cc == 92 || cc == 34) return true;
    if (cc >= 0 && cc <= 31) return true;
    if (cc >= 127 && cc <= 159) return true;
    if (cc >= 1536 && cc <= 1540) return true;
    if (cc >= 8204 && cc <= 8207) return true;
    if (cc >= 8232 && cc <= 8239) return true;
    if (cc >= 8288 && cc <= 8303) return true;
    if (cc >= 65520 && cc <= 65535) return true;
    return false;
}

// quote those evil characters!
function quote(string) {
    var tstr = "";
    for (var chi = 0; chi < string.length; chi++) {
        if (testescapable(string.charAt(chi))) {
            tstr += quote_anon(string.charAt(chi));
        } else {
            tstr += string.charAt(chi);
        }
    }
    return '"' + tstr + '"';
}
