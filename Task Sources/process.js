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
  * 
  * @param {*} buffer 
  * @returns array containing 3 elements if 
  */
  module.exports.compareBuffer=function(buffer, sequenceKeys)
 {
     //key could be 4 letters
     //and the buffer could be 3
     //so the starting 4 can still match
     var combo=[];
     sequenceKeys.forEach(element => {
         //shorten buffer to length sequence
        
         var tempBuffer=buffer.slice();
         tempBuffer.shift(element.length);
         if (tempBuffer.join("")===element){
             //end loop as buffer and key match
             combo.push(1, tempBuffer, element);
             return combo;
         }
     });
 
     //if no key matched, push 0 as it means no match
     combo.push(0);
     return combo;
 }