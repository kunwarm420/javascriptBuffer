"use strict";

const testlib = require( './testlib.js' );
const dict={};//key and value pairs
let toCheckKeys;//holds all the keys
let count=0;//counts which offset the stream is at

testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );//prints the pattern

	//loop throught the patterns
	patterns.forEach(element => {
		dict[element]=0;
	});

	toCheckKeys=Object.keys(dict);
	console.log(dict);
	testlib.runTests();
} );

//holds the current two letters
let buffer=[];
testlib.on( 'data', function( data ) {

	if (testlib.on('reset', function))
	{
		console.log("Hello");
	}
	buffer.push(data);//add the data to buffer

	//if buffer i>2, delete first index letter
	if (buffer.length>2){
		buffer.shift();
	}

	
	//correct Length
	if (buffer.length===2){
		let twoWords=buffer[0]+buffer[1]; //String concatenation

		//for each loop to check every element in the keyCheck array
		toCheckKeys.forEach(element => {
			if (element==twoWords)//check if the 2 letters match
			{
				let num=dict[element];//current element value
				num++; //increment num by 1;
				dict[element]=num;

				testlib.foundMatch(element, count);//testlib 2
			}
		});
	}
	count++; //moving to the next letter
} );

testlib.on( 'end', function(data) {
	console.log(dict);
	testlib.frequencyTable(dict);
});

//sort the letters in ascending order and check


testlib.setup( 1 ); // Runs test 1 (task1.data and task1.seq)

