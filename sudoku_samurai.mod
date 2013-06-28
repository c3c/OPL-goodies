/*
 * A CP Optimizer OPL model for CPLEX
 * Solves samurai sudokus in a matter of milliseconds using branch-and-prune!
 *
 * Credit: Arya Ghodsi
 *         Cedric Van Bockhaven
 * 
 * Note: To run this model, you must attach a data file containg the "samurai" variable.
 *       This variable is a 3D-array containing the initial grid in the following order:
 *       TopLeft(1) - TopRight(2) - Middle(3) - BottomLeft(4) - BottomRight(5)
 */

using CP;

int samurai[1..5][1..9][1..9] = ...;
dvar int x[1..5][1..9][1..9] in 1..9;

subject to {
  // inputs
  
  forall (g in 1..5, i in 1..9, j in 1..9)
    if (samurai[g,i,j] != 0)
      samurai[g,i,j] == x[g,i,j];
  
  // actual constraints
  
  forall (raster in 1..5, idx in 1..9)
    allDifferent(all (i in 1..9) x[raster][idx][i]) && 
    allDifferent(all (i in 1..9) x[raster][i][idx]) &&
    allDifferent(all (i in 1..3, j in 1..3) x[raster][((idx-1) div 3)*3 + i][((idx-1) % 3)*3 + j]);
  
  // these fix the corners
  
  x[1,7,7] == x[3,1,1]; x[2,7,1] == x[3,1,7];
  x[1,7,8] == x[3,1,2]; x[2,7,2] == x[3,1,8];
  x[1,7,9] == x[3,1,3]; x[2,7,3] == x[3,1,9];
  x[1,8,7] == x[3,2,1]; x[2,8,1] == x[3,2,7];
  x[1,8,8] == x[3,2,2]; x[2,8,2] == x[3,2,8];
  x[1,8,9] == x[3,2,3]; x[2,8,3] == x[3,2,9];
  x[1,9,7] == x[3,3,1]; x[2,9,1] == x[3,3,7];
  x[1,9,8] == x[3,3,2]; x[2,9,2] == x[3,3,8];
  x[1,9,9] == x[3,3,3]; x[2,9,3] == x[3,3,9];
  
  x[4,1,7] == x[3,7,1]; x[5,1,1] == x[3,7,7];
  x[4,1,8] == x[3,7,2]; x[5,1,2] == x[3,7,8];
  x[4,1,9] == x[3,7,3]; x[5,1,3] == x[3,7,9];
  x[4,2,7] == x[3,8,1]; x[5,2,1] == x[3,8,7];
  x[4,2,8] == x[3,8,2]; x[5,2,2] == x[3,8,8];
  x[4,2,9] == x[3,8,3]; x[5,2,3] == x[3,8,9];
  x[4,3,7] == x[3,9,1]; x[5,3,1] == x[3,9,7];
  x[4,3,8] == x[3,9,2]; x[5,3,2] == x[3,9,8];
  x[4,3,9] == x[3,9,3]; x[5,3,3] == x[3,9,9];
};
