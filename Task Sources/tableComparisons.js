"use strict";
const testlib = require( './testlib.js' );


 module.exports.printMatch=function(buffer, offSet){
     testlib.foundMatch(buffer.join(""), offSet);
 }

 
/**
 * @param {*current stream of letter} buffer 
 * @param {array containing all the patterns} sequenceKeys 
 * @returns 1 if match found or else 0
 */
  module.exports.compareBuffer=function(buffer, sequenceKeys)
 {
     let anyMatches=sequenceKeys.some(element=>(element===equalLength(buffer, element).join("")));
     if(anyMatches===true){
        return 1;
     }
     else{
         return 0;
     }
 }


 module.exports.misMatches=function(buffer, allPatterns, patternPosition, nucleoTable){

    let currentPattern=allPatterns[patternPosition].split("");
    buffer=equalLength(buffer, currentPattern);

    let bufferDiff=buffer.filter((current, index)=>(current!==currentPattern[index]));
    let patternDiff=currentPattern.filter((current, index)=>(current!==buffer[index]));

    
    let tableLengthCheck=0;
    bufferDiff.forEach((element, index) => {
        var table=nucleoTable.filter(nucelo=> (nucelo.id===element && nucelo.swap.indexOf(patternDiff[index])!=-1));
        if(table.length!==0){ //if found
            tableLengthCheck++;
        }
    });

    if(tableLengthCheck===bufferDiff.length){
        return 1;
    }

    if(patternPosition===currentPattern.length+1){
       return 0;
    }
    patternPosition++;
    return (this.misMatches(buffer, allPatterns, patternPosition, nucleoTable));
 }


/**
 * @param {current stored stream of letters} buffer 
 * @param {one pattern that is going ot be compared} currentPattern 
 * /matches buffer and current pattern length by popping off back letters
 */
var equalLength=function(buffer, currentPattern){
    if(buffer.length>currentPattern.length){
        buffer.pop(currentPattern.length-buffer.length);
    }
    return buffer;
 }