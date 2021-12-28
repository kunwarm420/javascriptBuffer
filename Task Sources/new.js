"use strict";
const testlib = require( './testlib.js' );
const process = require( './process.js' );

//nucleo TABLE
var nucleoTable=[
    {id:"R", swap:["G", "A"]},
    {id:"Y", swap:["T", "C"]},
    {id:"K", swap:["G", "T"]},
    {id:"M", swap:["A", "C"]},
    {id:"S", swap:["G", "C"]},
    {id:"W", swap:["A", "T"]},
    {id:"B", swap:["G", "T", "C"]},
    {id:"D", swap:["G", "A", "T"]},
    {id:"H", swap:["A", "C", "T"]},
    {id:"V", swap:["G", "C", "A"]},
    {id:"N", swap:["A", "G", "C", "T"]}
];



const patternDict={};//key and value pairs
let count=0;//counts which offset the stream is at
let buffer=[];//holds longestStrlength amount of
let longestString;//longest a string sequence can be
let nucleoKeys=[];//holds nucleoTable ids
let sequenceKeys=[];//holds patterns keys


testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );

    /*store patterns in key and value pairs*/
	patterns.forEach(element => {
		patternDict[element]=0;
    });
	longestString=patterns.sort(function (a, b) { return b.length - a.length })[0];//returns longest string from pattenrs
    sequenceKeys=Object.keys(patternDict);

    nucleoKeys = nucleoTable.map( elem => elem.id);//nucleoTable ids
	testlib.frequencyTable(patternDict);//print table
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
    var check=process.compareBuffer(buffer, sequenceKeys);
    if (check[0]==1){
        process.printMatch(buffer, count); //match is found so repeat function for next buffer
    }
    else{
        /**
        * check where the buffer element and key are different
        * check if the different buffer element is a key from nucleo table
        * if it is, create a new var and hold the buffer element with the swapped key letter
        * repeat until done with all letters
        * compare buffer and key to see if they match
        * if matched, do testlib.foundmatch, else function restarts
        */

  
        let lettersToFix=[];
        sequenceKeys.forEach(sequenceElement => {
            var tempBuffer=buffer.slice();//clone buffer
            console.log("BEFORE", buffer, tempBuffer, sequenceElement,lettersToFix);
            tempBuffer.length=sequenceElement.length;//set clone to size of current sequence to compare
            let letterPosition=buffer.indexOf(tempBuffer);

            console.log(tempBuffer, sequenceElement,lettersToFix);
            if (tempBuffer[letterPosition]!==sequenceKeys[letterPosition]){
                lettersToFix.push(tempBuffer[letterPosition]);
                console.log("Different", tempBuffer, sequenceElement,lettersToFix);
            }});
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


testlib.setup(1); // Runs test 1 (task1.data and task1.seq)