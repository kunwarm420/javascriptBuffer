const fs = require( 'fs' );
let buffer = [];

setup = function(myDataFile)
{
   
    let dataFile = fs.createReadStream(myDataFile, {encoding: 'utf8', fd: null } );
    dataFile.on('readable', function() 
    {
        //dataFile.read()
        let chunk;
		while (null !== (chunk = dataFile.read(2))) {
            console.log(chunk);
			buffer.push( chunk);
		}
    });
    dataFile.on( 'end', function() {
        console.log(buffer);
        console.log("end");
    });
}

setup('myDataFile.data');