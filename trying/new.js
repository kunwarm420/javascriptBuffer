var fs = require( 'fs' );

var dataFile=fs.createReadStream(__dirname+ '/myTest.txt');
//let dataFile = fs.createReadStream(myDataFile.data, {encoding: 'utf8', fd: null } );
dataFile.on('data', function(chunk) 
{
    console.log(chunk);
});
