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

/*
// From web    by the end of 9.2...
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
*/

const inquirer = require('inquirer');
// console.log(inquirer);

/*
First 
-----
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));
*/

/*
Second - Inside a function
*/
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }      
      }    
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your GitHub UserName?',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter the Github UserName!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',  
      message: 'Provide some information about yourself:',
      when: ({confirmAbout}) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }

  ])
}

const promptProject = portfolioData => {

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionProjectInput => {
        if (descriptionProjectInput) {
          return true;
        } else {
          console.log('Please enter the project description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: githubLink => {
        if (githubLink) {
          return true;
        } else {
          console.log('Please enter the Github Link!');
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
  }

// promptUser().then(answers => console.log(answers));


// promptUser()
//   .then(answers => console.log(answers))
//   .then(promptProject)
//   .then(projectAnswers => console.log(projectAnswers));

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });