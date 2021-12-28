"use strict";
const { countReset } = require('console');
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
let shortestSeqLen;
let sequencetoCheck;
let nucleoKeys=Object.keys(nucleo);//list of keys in nucleoKeys
let nucleoValues=Object.values(nucleo);//list of values in nucleoKeys


//console.log("nucleo keys",nucleoKeys);
testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );//prints the pattern
	//loop throught the patterns
	patterns.forEach(element => {
		dict[element]=0;});

	toCheckKeys=Object.keys(dict); //holding the keys
	//get the longest and shortest length string
	longestStrLength=patterns.sort(function (a, b) { return b.length - a.length })[0];
	shortestSeqLen=patterns.reduce((a, b) => a.length <= b.length ? a : b);
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
		//final(variable ) return arrays
		//comparing(variable) returns string

		//loop through each key 
		toCheckKeys.forEach(element => {
			//get length of the current key
			//and the number of letters to remove
			let checkSize=element.length;
			let sizeToRemove=longestStrLength.length-checkSize;
			
			//get keys for the nomral compare
			let finalStr=finalValueOrder(buffer, element, sizeToRemove);
			let comparingStr=""; //finally changing to str which we can compare
			finalStr.forEach(element => {
				comparingStr=comparingStr+element;
			});

			let finalKey=finalKeyOrder(element);
			let comparingKey=""; //finally changing to str which we can compare
			finalKey.forEach(element => {
				comparingKey=comparingKey+element;
			});

			if (comparingKey===comparingStr){ //check if the two String Match
				let num=dict[element];//get current key element value
				num++; //increment that num by 1;
				dict[element]=num; //set the value of num
				testlib.foundMatch(element, count);//if found print
			}

			else //if they dont match, check if letters can be swapped
			{
				let x=compareArrayToTable(nucleoKeys, finalStr);//if at least 1 wild key
				if (x==true)//finalStr contains nucleoKeys
				{   
					//compare each string and key at everyt indexes and see if they match
					// if it doesnt add it to the key and value table
					let wrongPlaceSeq={};
					let wrongPlaceStr={};

					let currentIndex=0;
					finalStr.forEach(stringElem => {
						if(stringElem!=finalKey[currentIndex])
						{
							wrongPlaceSeq[finalKey[currentIndex]]=currentIndex;
							wrongPlaceStr[stringElem]=currentIndex;
						}
						currentIndex++;
					});

					//now extract the key and compare them to nucleo keys to check if any of them are similar
					let wrongPlaceStrDict=Object.keys(wrongPlaceStr);
					let intersection = wrongPlaceStrDict.filter(x => nucleoKeys.includes(x));

					//check if number of matched keys is equal to wrongPlaceStr
					if (intersection.length==wrongPlaceStrDict.length)
					{
						//console.log("lOOPING");
						//loop through each string key
						//compare it to nucleo table keys and their respective values to the key we need
						//check if they values is in there for every string key and the value
						//if one doesnt match, the whole shenanigan is over, we move to the next key
						var looper=0;
						//intesection holds the values we are to be searching with
						//to get the value we want 
						let wrongPlaceSeqArr=Object.keys(wrongPlaceSeq);
						let wrongPlaceStrArr=Object.keys(wrongPlaceStr);

						wrongPlaceSeqArr.forEach(changeThisLetter => {
							wrongPlaceStrArr.forEach(searchWithThis => {

								let nucleoIndex=nucleo[searchWithThis];
								//nucleoIndex.toString();//idk why but stack told me to after error
								//console.log("if", searchWithThis, "contains", changeThisLetter, "by searching ",nucleoIndex,"//KV:", finalKey, finalStr);
								let toArrayType=[changeThisLetter];
								toArrayType = toArrayType.filter(x => nucleoIndex.includes(x));

								if(toArrayType.length!=0)
								{
									//searchWithThis needs to be replc
									console.log(searchWithThis,changeThisLetter,finalStr, finalKey, toArrayType);
								}
								else
								{
									console.log("Nothibng Found");
								}

							});
							looper++;
						});
					}
					//console.log(finalKey, finalStr, wrongPlaceKey, wrongPlaceStr, wrongPlaceStrKeys, intersection);
				}
				//else just pass throught to next loop
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

let compareArrayToTable=function findCommonElements3(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
}
let finalValueOrder=function(buffer, element, sizeToRemove)
{
	//change buffer to str and then back to array
	let comparingStr=buffer.toString();
	comparingStr= comparingStr.split(',').join('');
	comparingStr = comparingStr.split("");

	//remove starting unnecessary letters and then sort alphabetically
	comparingStr.splice(element.length, sizeToRemove);
	//comparingStr.sort();

	let finalStr=""; //finally changing to str which we can compare
	comparingStr.forEach(element => {
		finalStr=finalStr+element;
	});
	
	//console.log(finalStr);
	return comparingStr;
}

let finalKeyOrder=function(element)
{
	//do the same thing for the elements
	let comparingKey=element.toString();
	comparingKey= comparingKey.split(',').join('');
	comparingKey = comparingKey.split("");

	//comparingKey.sort();

	// let finalKey=""; //finally changing to str which we can compare
	// comparingKey.forEach(element => {
	// 	finalKey=finalKey+element;
	// });
	//console.log(finalKey);
	return comparingKey;
}

testlib.setup(3); // Runs test 1 (task1.data and task1.seq)