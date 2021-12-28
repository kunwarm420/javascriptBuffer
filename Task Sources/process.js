"use strict";

/**
 * @param {string that match} buffer 
 * @param {the position buffer is at} count 
 */
 var printMatch=function(buffer, count)
 {
     testlib.foundMatch(buffer.join(""), count);
 }
 
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
  * 
  * @param {*} buffer 
  * @returns array containing 3 elements if 
  */
 var compareBuffer=function(buffer)
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