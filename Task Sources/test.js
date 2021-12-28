const students = 
[{id:["12345", "123"], mark:"A"},
{id:["17346", "231234"] ,mark:"B"}];
const ids = students.map( elem => elem.id);
console.log( ids ); // [12345,17346]