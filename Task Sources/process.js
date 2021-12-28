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
     //buffer could be 4 letters
     //and the key could be 3
     //but hte starting 3 can mathc
     var combo=[];
     sequenceKeys.forEach(element => {
         //shorten buffer to length sequence
         buffer.length=element.length;
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