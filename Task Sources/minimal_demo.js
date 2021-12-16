"use strict";
const testlib = require( './testlib.js' );

//nucleo TABLE"
var nucleo={R: ["G", "A"],
 			Y: ["T", "C"],
			K: ["G", "T"],
			M: ["A", "C"],
			S: ["G", "C"],
			W: ["A", "T"],
			B: ["G", "T", "C"],
			D: ["G", "A", "T"],
			H: ["A", "C", "T"],
			V: ["G", "C", "A"],
			N: ["A", "G", "C", "T"]};


const dict={};//key and value pairs
var toCheckKeys;//holds all the keys
let count=0;//counts which offset the stream is at
let buffer=[];//holds longestStrlength amount of
let longestStrLength;//longest a string sequence can be
let sequencetoCheck;
let nucleoKeys=Object.keys(nucleo);//list of keys in nucleoKeys

console.log("nucleo keys", nucleoKeys);
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

	if (buffer.length!=longestStrLength.length)
	{
		count=0;//this is beacuse the thing is being initalized
	}
	//is the same length as the largest sequence possible
	if (buffer.length===longestStrLength.length)
	{
		//loop through each key 
		toCheckKeys.forEach(element => {
			//get length of the current key
			//and the number of letters to remove
			let checkSize=element.length;
			let sizeToRemove=longestStrLength.length-checkSize;
			
			let finalStr=finalValueOrder(buffer, element, sizeToRemove);
			let finalKey=finalKeyOrder(element);

			if (finalKey===finalStr){ //check if the two String Match
				let num=dict[element];//get current key element value
				num++; //increment that num by 1;
				dict[element]=num; //set the value of num
				testlib.foundMatch(element, count);//if found print
			}
		});
	}
	count++; //moving to the next letter
});

//when a /n is called
testlib.on('reset', function(data)
{
	testlib.frequencyTable(dict);
});

//end of the stream
testlib.on( 'end', function(data) {
	testlib.frequencyTable(dict);
});


let finalValueOrder=function(buffer, element, sizeToRemove)
{
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
	
	//console.log(finalStr);
	return finalStr;
}

let finalKeyOrder=function(element)
{
	//do the same thing for the elements
	let comparingKey=element.toString();
	comparingKey= comparingKey.split(',').join('');
	comparingKey = comparingKey.split("");

	comparingKey.sort();

	let finalKey=""; //finally changing to str which we can compare
	comparingKey.forEach(element => {
		finalKey=finalKey+element;
	});
	//console.log(finalKey);
	return finalKey;
}

testlib.setup(1); // Runs test 1 (task1.data and task1.seq)