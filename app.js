const inquirer = require("inquirer");
const fs = require('fs');
const generatePage = require('./src/page-template.js');

// const [name, github] = profileDataArgs;

//console.log(generatePage(name, github));

// fs.writeFile('./index.html', generatePage(name, github), err => {
// if (err) throw new Error(err);

// console.log('Portfolio complete! Check out index.html to see the output!');
// });
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;  // the user receives a message and is prompted with the same question until an answer is received.
        }
      }
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub Username!');
          return false;  // the user receives a message and is prompted with the same question until an answer is received.
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',  // do you want to add an about me section and uses the name: key value confirmAbout"
      default: true
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({confirmAbout}) => {   //when is listening for a true answer on the confirmAbout respose and passes all the answers givin so far in the object
        if(confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    },
  ]);
};

const promptProject = (portfolioData) => {
  //before looked like this..  const promptProject = () => {   now we passed a parameter that = an array to store the data (portfolioData)

  if (!portfolioData.projects) {
    //guarantee the array is initialized only on the first pass stores the object answers in an array
    portfolioData.projects = []; // this is the data collection system in place
  }

  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project?",
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description of the project (Required)",
      validate: discriptionInput => {
        if (discriptionInput) {
          return true;
        } else {
          console.log('Please enter your description of your project!');
          return false;  // the user receives a message and is prompted with the same question until an answer is received.
        }
      }
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What did you build this project with? (Check all that apply)",
      choices: [
        "JavaScript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node",
      ],
    },
    {
      type: "input",
      name: "link",
      message: "Enter the GitHub link to your project. (Required)",
      validate: githubLinkInput => {
        if (githubLinkInput) {
          return true;
        } else {
          console.log('Please enter link to your project!');
          return false;  // the user receives a message and is prompted with the same question until an answer is received.
        }
      }
    },
    {
      type: "confirm",
      name: "feature",
      message: "Would you like to feature this project?",
      default: false,
    },
    {
      type: "confirm",
      name: "confirmAddProject", //
      message: "Would you like to enter another project?",
      default: false,
    }

  ])

  .then(projectData => {  // created here to store the users answer to "would you like to add another prodject?"
    portfolioData.projects.push(projectData);  //pushs projectData.projects (object) to array

    if(projectData.confirmAddProject) {   //if confirmAddData was choosen (true) by user they will be asked about another project
      return promptProject(portfolioData); 
    } else {
      return portfolioData;  // return the information they added so far
    };
  });

};


const pageHTML = generatePage(mockData);  //mock data/ needs to be removed
// promptUser()
 // .then(promptProject)
 // .then(portfolioData => {
  //   const pageHTML = generatePage();

    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);
  
 // });
