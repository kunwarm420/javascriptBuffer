const fs = require( 'fs' );
let buffer = [];
setup = function(myDataFile) {
let dataFile = fs.createReadStream(myDataFile, { encoding: 'utf8', fd: 
null } );
dataFile.on('readable', function() {
 //your code here
});
dataFile.on( 'end', function() {
 //your code here
});
}
setup('myDataFile.data');