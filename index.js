const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function readmeItemGenerator(userInput) {
    return `
            # **README GENERATOR**
    
            # Title of Project
            ${userInput.projectTitle}
            
            ## Description    
            ${userInput.description}
            
            ## Table of Contents
            ${userInput.tableOfContents}
            
            ### Installed packages 
            ${userInput.frameworkUsed}
    
            ### Technology used during build
            ${userInput.technologyUsed}
    
            ### Deployment Instructions 
            ${userInput.deployment}
    
            ### Common questions
            ${userInput.questions}
            
            ### License${userInput.license}
    
            #### Badges
            [![Social](https://img.shields.io/github/followers/MidzZcoder?style=for-the-badge)
            
            ### GitHub Username of Primary Developer
            ${userInput.email}
    
            ### Contributors
            ${userInput.contributors}
            `;
        }
function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: "Enter your project title?",
        },
        {
            type: "checkbox",
            message: "Select your table of contents?",
            name: "tableOfContents",
            choices: [
                "Project Title",
                "Description",
                "Installation",
                "Technology Used",
                "Usage",
                "License",
                "Contributors",
                "Tests",
                "Acknowledgments"
            ]
        },
        {
            type: "input",
            name: "description",
            message: "Describe your project in a couple of sentences"
        },
        {
            type: "input",
            name: "technologyUsed",
            message: "What technologies did you use to build your project? ",
        },
        {
            type: "input",
            name: "frameworkUsed",
            message: "What frameworks did you use to build your project?",
        },
        {
            type: "input",
            name: "deployment",
            message: "Add any additional notes about how to deploy this on a live system."
        },
        {
            type: "list",
            name: "license",
            message: "Select the licenses appropriate for this project?",
            choices: [
                "MIT",
                "GPL 3.0",
                "Apache 2.0",
                "GPL 2.0",
                "BSD 3",
                "LGPL 2.1",
                "MS-Pl",
                "BSD 2"
            ]
        },
        {
            type: "input",
            name: "contributors",
            message: "Enter the list of contributors."
        },
        {
            type: "input",
            name: "tests",
            message: "Which tests did you include, if any?"
        },
        {
            type: "input",
            name: "acknowledgments",
            message: "Hat tip to anyone whose code was used"
        },
        {
            type: "input",
            name: "username",
            message: "Enter your GitHub username?"
        }
    ]);
} 

const gitusername  = require("axios");

  function apiCall( username ) {
    const queryUrl = `https://api.github.com/users/${username}`;
    
    return gitusername 
    .get(queryUrl)
    .then(function(response){
      
      const result = {
          avatar_url: response.data.avatar_url,
          email : (response.data.email) ? response.email : "my_email@github.com"
      }
      return result;
    })
  };

function init() {

    try {
        const userInput = await promptUser();
        const results = await apiCall(userInput.username);
        userInput.email = results.email;
        userInput.avatar_url = results.avatar_url;
        const generateContent = readmeItemGenerator(userInput);
         
        console.log(results);
        await writeFileAsync("README.md", generateContent);
    
        console.log("Successfully wrote to README.md");
      } catch(err) {
        console.log(err);
      }
    }

init();