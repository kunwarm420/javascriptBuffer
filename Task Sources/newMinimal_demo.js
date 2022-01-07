"use strict";
const testlib = require( './testlib.js' );
const process = require( './tableComparisons.js' );


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
let offSet=0;//counts which offset the stream is at
let buffer=[];//holds the current letters
let longestStringLen;//len of the longest pattern
let nucleoKeys=[];//holds nucleoTable keys()
let sequenceKeys=[];//holds patterns keys


testlib.on( 'ready', function( patterns ) {
	console.log( "Patterns:", patterns );

    /*store patterns in key and value pairs*/
	patterns.forEach(element => {
		patternDict[element]=0;
    });
	longestStringLen=patterns.sort(function (a, b) { return b.length - a.length })[0].length;//returns longest string from pattenrs
    sequenceKeys=Object.keys(patternDict);

    nucleoKeys = nucleoTable.map( elem => elem.id);//nucleoTable ids
	testlib.frequencyTable(patternDict);//print table
	testlib.runTests();
} );



testlib.on( 'data', function( data ) {
    //add letter to start and delete from back
	buffer.push(data);
    
    if (checkBuffer(buffer).length===longestStringLen){
        var checkMatch=process.compareBuffer(buffer, sequenceKeys);
        //if no match between the buffer and pattern found
        if (checkMatch!==1){
            let misMatchedCompare=process.misMatches(buffer, sequenceKeys, 0, nucleoTable);
            if(misMatchedCompare===1){
                process.printMatch(buffer, offSet);
            }
        }
        else{
            process.printMatch(buffer, offSet);
        }
        offSet++;
    }
});

 


var checkBuffer=function(buffer)
 {
     if (buffer.length>longestStringLen){
        buffer.shift();
     }
     return buffer;
 }

testlib.setup(1); // Runs test 1 (task1.data and task1.seq)