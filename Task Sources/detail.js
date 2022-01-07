const { start } = require("repl");

const arr1 = [1, 2, 3];
const arr2 = [1, 3, 3];
const values = ["first", "second", "third", "fourth", "fifth"];

let x=arr1.reduce((current,index,array)=>({...current, [index]: values[array]}), {}); // [1]
let y=arr1.reduce((current,index,array)=>({...current, [index]: arr2[array]}), {}); // [1]
let z=arr1.filter((current, index)=>(current===arr2[index]));

// console.log(arr1, arr2);
var b={};
let a=arr1.filter(function(current, index){
    if(current!==arr2[index]){
        b[current]=arr2[index];
    }
})

// console.log(b);
// arr1.forEach(function(element, index) => {
//     if(element==arr2[index]){
//         b[element]==arr2[index];
//     }
    
// });

// var toFindElement={};
// tempBuffer.filter(function(current, index){
//     if(current!==tempSequence[index]){
//         toFindElement[current]=tempSequence[index];
//     }
// });


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

const table=nucleoTable.filter(nucelo=> (nucelo.id==="R" && nucelo.swap.indexOf("A")!=-1));


fromBuffer=['R', 'A'];
findElement=['A', 'A'];
let tableLengthCheck=0;

let starting=function startup(){
    let start=fromBuffer.forEach((element, index) => {
        var table=nucleoTable.filter(nucelo=> (nucelo.id===element && nucelo.swap.indexOf(findElement[index])!=-1));
        console.log("new", table, element, findElement[index]);
        if(table.length!==0){ //if found
            tableLengthCheck++;
            return 1;
        }
    });

}


let buffer=['A', 'A'];
console.log(buffer.join(""));
// if(tableLengthCheck===fromBuffer.length){
//     //console.log(tableLengthCheck, "Buffer", fromBuffer, "Sequence", findElement);
//     console.log(tableLengthCheck); 
//     return 1;
// }
