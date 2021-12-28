var nucleo={R: ["G", "A"],
 			Y: ["T", "C"],
			K: ["G", "T"],
			M: ["A", "C"],
			S: ["G", "C"],
			W: ["A", "T"],
			B: ["G", "T", "C"],
			D: ["G", "A", "T"],
			H: ["A", "C", "T"],
			V: ["G", "C", "A"],
			N: ["A", "G", "C", "T"]};

var next={
	R: "hi",
	B: "bye"
};


var obj = {
	a: "A",
	b: "B",
	c: "C"
 };
 
 let x=['s', 'd'];


let y="s";
let z=[y];
 if (x.indexOf(z))
 {
	 console.log("Hllo world");
 }
 else
 {
	 console.log("NOPE");
 }
//  let change="N";
//  let value=nucleo.change;
 
 console.log(x);  // return string : A

var name = "R";
console.log(nucleo[name]);
 
 //var name = "a";
 //console.log(nucleo[R]);

// var x=Object.keys(next).find(key => next[key] === value);

// let y=Object.entries(next);



// for(letter in x)
// {
// 	console.log(letter);
// }
