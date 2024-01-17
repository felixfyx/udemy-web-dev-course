//var generateName = require("sillyname");
import generateName from "sillyname";
import superhero from "superheroes";

var sillyName = generateName();

console.log(`My name is ${sillyName}`);

var heroName = superhero.random();

console.log(`My alter ego is ${heroName}`);