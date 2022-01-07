"use strict";
const testlib = require( './testlib.js' );
const process = require( './process.js' );
const { match } = require('assert');

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

    if (buffer.length===longestString.length){
        /**
         * check is an array containing 0 or 1 at index 0
         * 0 means a match between buffer and a pattern
         * 1 means no match between the buffer and pattern 
         */
        var check=process.compareBuffer(buffer, sequenceKeys);
        if (check[0]===1){
            process.printMatch(buffer, count); //match is found so repeat function for next buffer
        }
        else{
            //returns 1 if match found, 0 if not
            var matchingKeys=process.bufferPatternRelation(buffer, sequenceKeys, nucleoTable);
            if(matchingKeys===1){
                process.printMatch(buffer, count);
            }
    
        }
        count++;
    }
});

 
 /**
  * @param {current word Stream buffer} buffer 
  * @returns array containing 1 item or 3 items
  */
var checkBuffer=function(buffer)
 {
     /**
     *ONLY for when the program starts
     *buffer can be < largestString
     */
     if (buffer.length<longestString.length){
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