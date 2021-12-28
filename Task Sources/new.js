"use strict";
const { execPath } = require('process');
const testlib = require( './testlib.js' );

//nucleo TABLE
var nucleoTable={R: ["G", "A"],
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
let count=0;//counts which offset the stream is at
let buffer=[];//holds longestStrlength amount of
let longestString;//longest a string sequence can be

let nucleoKeys=[];
let sequenceKeys=[];
testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );

    /*store patterns in key and value pairs*/
	patterns.forEach(element => {
		dict[element]=0;
    });

    nucleoKeys=Object.keys(nucleoTable);
    sequenceKeys=Object.keys(dict);

    //returns logestString
	longestString=patterns.sort(function (a, b) { return b.length - a.length })[0];
	testlib.frequencyTable(dict);//print table
	testlib.runTests();
} );



testlib.on( 'data', function( data ) {
	buffer.push(data);
    buffer=checkBuffer(buffer);

    /**
     * var is an array
     * check[0] contains (0 or 1)
     * 1 is match found and 0 is not found
     * if 1 is passed, array also contains 2 new elements
     * check[1] contains buffer
     * check[2] contains key
     */
    var check=compareBuffer(buffer);
    if (check[0]==1){
        testlib.foundMatch(check[1].join(""), count);
        //match is found so repeat function for next buffer
    }
    else{
        /**
        * swap buffer letters from nucelo table
        * to check if buffer matches any keys
        */
    }

	count++; //moving to the next letter
    
});


/**
 * @param {reset count when starting and remove letter} buffer 
 * @returns array containing 1 item or 3 items
 */
var checkBuffer=function(buffer)
{
    /**
    *ONLY for when the program starts
    *buffer can be < largestString
    */
    if (buffer.length<longestString.length){
        console.log("count resetted");
		count=0;
    }

    /**
    *if buffer>largest possibe string
    *remove a starting letter
    */
	if (buffer.length>longestString.length){
		buffer.shift();
    }
    return buffer;
}

/**
 * @param {compare this to all key sequence} buffer 
 */
var compareBuffer=function(buffer)
{
    var combo=[];
    sequenceKeys.forEach(element => {
        if (buffer.join("")===element){
            //end loop as buffer and key match
            combo.push(1, buffer, element);
            return combo;
        }
    });

    //if no key matched, push 0 as it means no match
    combo.push(0);
    return combo;
}

testlib.setup(1); // Runs test 1 (task1.data and task1.seq)