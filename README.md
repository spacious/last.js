### &boxH;&boxDL;&boxDR;&boxH;&boxH;&boxH;&boxDL;<br />&nbsp;&nbsp;&nbsp;&roarr;&nbsp;&lopf;&aopf;&sopf;&topf;.&jopf;&sopf;<br />&boxH;&boxUL;&boxUR;&boxH;&boxH;&boxH;&boxUL;

> originally a fork of [fast.js](https://github.com/codemix/fast.js) implemented with the data to be operated on *last*

> the structure/project changed so much the fork was removed (although many functions do still exist)

> additions came from real world usage and inspiration from libraries such as [ramda](https://github.com/ramda/ramda)

inline with it's heritage it's goal is to still be *fast*:

&roarr; functions are stand-alone and self-contained (ie they do not call/use each other)

&roarr; iterators are each painfully implemented with their own ``while`` loops

&roarr; mutation is discouraged (but will be noted when it occurs)

&roarr; implemented in vanilla es5 currently for speed 

&nbsp;&nbsp;&nbsp;(es6 version may support node 4+ usage in the future, it is yet fully feature/test complete)

##### warnings: &crarr; 
functions contained herein:
- should **not** be considerd "drop-in" replacements for this or that library 
- *may not* follow spec or follow spec *way too much*
- might just do stupid things you hate

*who cares?*
- this is just a simple set of functions
- 100% test coverage (es5)
- minimal versioning/api changes







