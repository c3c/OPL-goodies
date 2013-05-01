JSON-for-OPL
============

Provides a javascript implementation to export objects in OPL, the language used in CPLEX.
I based this on the JSON2 library by Douglas Crockford

--
OPL only has very basic javascript functionality
e.g. 
- typeof checks can't have type coercion, 
- .prototype doesn't exist, 
- there's no RegExp, no array.push, ...

For the moment the stringify'er can handle the basic datatypes in OPL.
If any more of them should be needed, they can be added easily.

--
Example:

    dvar int x[R];
    // ..
    execute {
      includeScript("jsonopl.js");
      writeln(stringify(x));
    }
--
*ToDo*: 
- if tuples use identifier, use it as object key,
- add IloIntRange and consorts
