/*
 * String formatting functions for OPL
 * By Cedric Van Bockhaven
 */

function sprintf() {
  var argies = new Array();
  for (var i = 1; i < arguments.length; i++) 
    argies[argies.length] = arguments[i];
    
  return IloOplCallJava("java.lang.String", "format", 
    "(Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/String;", arguments[0], argies);
}
  
function printf() {
  var argies = new Array();
  for (var i = 1; i < arguments.length; i++) 
    argies[argies.length] = arguments[i];
    
  writeln(IloOplCallJava("java.lang.String", "format", 
    "(Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/String;", arguments[0], argies));
}
