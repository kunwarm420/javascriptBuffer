"use strict";
const { arrayBuffer } = require('stream/consumers');
const testlib = require( './testlib.js' );


const dict={};//key and value pairs
var toCheckKeys;//holds all the keys
let count=0;//counts which offset the stream is at
let buffer=[];//holds longestStrlength amount of
let longestStrLength;//longest a string sequence can be



testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );//prints the pattern

	//loop throught the patterns
	patterns.forEach(element => {
		dict[element]=0;
	});
	toCheckKeys=Object.keys(dict); //holding the keys

	//get the longest length string
	longestStrLength=patterns.sort(function (a, b) { return b.length - a.length })[0];

	testlib.frequencyTable(dict);//print table
	testlib.runTests();
} );

testlib.on( 'data', function( data ) {
	//add data to buffer
	buffer.push(data);

	//if current buffer is larger than the largest sequence
	if (buffer.length>longestStrLength.length){
		buffer.shift();
	}

	//is the same length as the largest sequence possible
	if (buffer.length===longestStrLength.length){


		//loop through each key 
		toCheckKeys.forEach(element => {
			
			//get length of the current key
			//and the number of letters to remove
			let checkSize=element.length;
			let sizeToRemove=longestStrLength.length-checkSize;
			
			//change buffer to str and then back to array
			let comparingStr=buffer.toString();
			comparingStr= comparingStr.split(',').join('');
			comparingStr = comparingStr.split("");
	
			//remove starting unnecessary letters and then sort alphabetically
			comparingStr.splice(element.length, sizeToRemove);
			comparingStr.sort();
	

			let finalStr=""; //finally changing to str which we can compare
			comparingStr.forEach(element => {
				finalStr=finalStr+element;
			});

			//do the same thing for the elements
			let comparingKey=element.toString();
			comparingKey= comparingKey.split(',').join('');
			comparingKey = comparingKey.split("");
	
			comparingKey.splice(element.length, sizeToRemove);
			comparingKey.sort();
	
			let finalKey=""; //finally changing to str which we can compare
			comparingKey.forEach(element => {
				finalKey=finalKey+element;
			});

			console.log(element, finalKey, finalStr);

			if (finalKey===finalStr)//check if the 2 words match
			{
				let num=dict[element];//get current key element value
				num++; //increment that num by 1;
				dict[element]=num; //set the value of num
			
				testlib.foundMatch(element, count);//if found print
			}
		});
	}
	count++; //moving to the next letter
} );

//when a /n is called
testlib.on('reset', function(data)
{
	testlib.frequencyTable(dict);
});

//end of the stream
testlib.on( 'end', function(data) {
	testlib.frequencyTable(dict);
});


testlib.setup(3); // Runs test 1 (task1.data and task1.seq)