"use strict";
const testlib = require( './testlib.js' );

/**
 * @param {string that match} buffer 
 * @param {the position buffer is at} count 
 */
 module.exports.printMatch=function(buffer, count)
 {
     testlib.foundMatch(buffer.join(""), count);
 }

 
 /**
  * @param {*} buffer 
  * @returns array containing 3 elements if 
  */
  module.exports.compareBuffer=function(buffer, sequenceKeys)
 {
     var combo=[];
     sequenceKeys.foreach(element => {
        /**
        * buffer can be 3 char ("aaa")
        * sequence can be 2 char("aa")
        * therefore, we have to delete the last char 
        * to match the buffer size or else they will never match
        */
         const tempBuffer=buffer.slice();
         if(tempBuffer.length>element.length){
            tempBuffer.pop(tempBuffer.length-element.length);
         }

         if (tempBuffer.join("")===element){
             combo.push(1, tempBuffer, element);
             return combo;
            }
        });
     /**
      * if no sequence match with buffer
      */
     combo.push(0);
     return combo;
 }


 


/**
 * @param {*} buffer the current buffer from data
 * @param {*} sequenceKeys the patter we need to check against buffer 
 * @returns an array, 0 means some m
 * compares buffer to sequence keys to find where they are different
 */
 module.exports.bufferPatternRelation=function(buffer, sequenceKeys, nucleoTable){

    var switchKey=0;
    sequenceKeys.every(sequenceElement => {
    
        var tempBuffer=buffer.slice();//copy buffer
        var tempSequence=sequenceElement.split('');//str to arr
        var bufferMinusSequence=tempBuffer.length-tempSequence.length;//buffer size to current sequence key
        if(bufferMinusSequence!==0){
            tempBuffer.pop(bufferMinusSequence);
        }
        
        //get the difference in element
        let fromBuffer=tempBuffer.filter((current, index)=>(current!==tempSequence[index]));
        let findElement=tempSequence.filter((current, index)=>(current!==tempBuffer[index]));

        let tableLengthCheck=0;
        fromBuffer.forEach((element, index) => {
            var table=nucleoTable.filter(nucelo=> (nucelo.id===element && nucelo.swap.indexOf(findElement[index])!=-1));
            if(table.length!==0){ //if found
                tableLengthCheck++;
            }
        });

        if(tableLengthCheck===fromBuffer.length){
            return 1;
        }
    });

    //if never returned 1
    return 0;
 }