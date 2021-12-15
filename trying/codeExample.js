/*let someArray = [];
someArray[100] = 5;
console.log(someArray.length);
*/



someArray = [1,2,3,4,5,6,7,8,9,10];
someArray.length = 3;
console.log(someArray);
someArray.length = 10;
console.log(someArray);


///////////////////////////////////////



let store = {
    name: 'store name',
    address: {            
        street: 'street name',     
        city: 'Lancaster',
        country: 'UK',
        postCode: 'LA1 xxx',
    },
};

console.log(store);
console.log("keys = " , Object.keys(store));
console.log("hasOwnProperty(name1) = " , store.hasOwnProperty("name1"));


let descriptor = Object.getOwnPropertyDescriptor(store, 'name');
console.log("name descriptor = " ,descriptor);


Object.defineProperty(store, "name", {
  writable: false,enumerable:false,configurable:true
});

console.log("keys = " , Object.keys(store));
store.name = 'another store name';
console.log(store);

Object.defineProperty(store, "name", {
  writable: true
});



////////////////////////////////////////

/*

let book = {
    title: 'some title',
    author: 'author name', 
	get info(){
		return `${this.title} written by ${this.author}`;
	}        
};
console.log(book.info);


////////////////////////////////////////
let f = function( x ) {
	return x + 1;
};

console.log(f(3));
*/