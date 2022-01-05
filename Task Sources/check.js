const keys = [0, 4, 2, 3, 1];
const values = ["first", "second", "third", "fourth", "fifth"];
const buildMap = (keys, values) => {
   const map = new Map();
   for(let i = 0; i < keys.length; i++){
      map.set(keys[i], values[i]);
   };
   return map;
};
console.log(buildMap(keys, values));


const arr1 = [1, 2, 3];
const arr2 = [1, 3, 3];


let x=arr1.reduce((o,k,i)=>({...o, [k]: values[i]}), {}); // [1]
console.log("X", x);
console.log(arr1.filter(e => arr2.indexOf(e) > -1 ? false : true)); // [1]

var array = [
   {id: 6, name: 'John', age: 20},
   {id: 1, name: 'Jane', age: 22},
   {id: 2, name: 'Bob', age: 24},
   {id: 3, name: 'Ana', age: 26},
];
array.forEach(function(profile, index) {
   console.log(`Index: ${index}, Name: ${profile.name}`);
});

arr1.forEach((element, index) => {
   if(arr1[index]===arr2[index]){
      console.log(arr1[index]);
   }});

console.log(arr1, arr2);
let v=arr1.filter((array, index)=> array!==arr2[index]);
console.log(v);
//console.log(x.map(a=> x.keys()===x.values()));
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 4);
console.log(citrus);