// const profileDataArgs = process.argv.slice(2);

// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);


////
// Option 1
/*
const generatePage = () => 'Name: Jane, Github: janehub';
console.log(generatePage()) ;
*/


// Option 2:   Template Literals
/*
const generatePage = (userName,githubName) => `Name: ${userName}, Github: ${githubName}`;
*/

////
// Option 3:   Multi-line strings
/// My attempt
/*
const fs = require('fs');
const generatePage = require('./src/page-template.js')

const profileDataArgs = process.argv.slice(2);

//const name   = profileDataArgs[0];
//const gitHub = profileDataArgs[1];
const [name, github] = profileDataArgs;

const pageHTML = generatePage(name, github);

//fs.writeFile('index.html', generatePage(name, gitHub), err => {
fs.writeFile('./index.html', pageHTML, err => {
if (err) throw err;


  console.log('Portfolio complete! Checkout index.html to see output!');

});
*/

// From web
const fs = require('fs');
const generatePage = require('./src/page-template');

const profileDataArgs = process.argv.slice(2);

console.log(profileDataArgs);

const [name, github] = profileDataArgs;

console.log(name, github);

const pageHTML = generatePage(name, github);

fs.writeFile('./index.html', pageHTML, err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});


