#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";

async function createReadme() {
  await inquirer
    .prompt(questions)
    .then((input) => {
      let mdFile = buildReadme(input);
      // console.info(mdFile);
      writeMdFile(input.title, mdFile);
    })
    .then((mdFile) => {
      // console.info(mdFile);
      return mdFile;
    });
}

async function writeMdFile(title, mdFile) {
  const fileName = `${title.toLowerCase().split(' ').join('')}_README.md`;
  fs.writeFile(fileName, mdFile, (err) => {
    err ? console.log(err) : console.log('Your project readme has been created');
  });
}

function buildReadme(input) {
  return `# ${input.title}\n`
  + `\n${licenses[input.license]}\n`
  + `\n## Description\n\n${input.description}\n`
  + `\n## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Credits](#credits)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  - [License](#license)\n`
  + `\n## Installation\n\n${input.installation}\n`
  + `\n## Usage\n\n${input.usage}\n`
  + `\n## Features\n\n${input.features}\n`
  + `\n## Credits\n\n${input.credits}\n`
  + `\n## Contributing\n\n${input.contribute}\n`
  + `\n## Tests\n\n${input.tests}\n`
  + `\n## Questions\n`
  + `\nGitHub username: ${input.gitName}\n`
  + `\nGitHub profile: https://github.com/${input.gitName}\n`
  + `\nSend any questions about the project to: ${input.email}\n`;
}

let questions = [
  {
    name: "title",
    message: "What is the name of your project?",
  },
  {
    name: "description",
    message: "Type a description of your project.",
  },
  {
    name: "installation",
    message: "Type any installation instructions needed for your project.",
  },
  {
    name: "usage",
    message: "How is your project to be used?",
  },
  {
    name: "features",
    message: "List any notable features for your project.",
  },
  {
    name: "credits",
    message: "Name anyone who helped with your project.",
  },
  {
    name: "contribute",
    message: "Let the world know how to contribute to your project.",
  },
  {
    name: "tests",
    message: "Type the instructions for any tests for your project.",
  },
  {
    type: "list",
    name: "license",
    choices: ["MIT", "Boost", "ISC", "The Unlicense", "Apache 2.0"],
    message: "Choose which license you would like to use for your project.",
  },
  {
    name: "gitName",
    message: "What is your GitHub username?",
  },
  {
    name: "email",
    message: "What is your email address?",
  },
  {
    name: "save",
    message: "Press <Enter> to build your tailored README for your project.",
  }
];

const licenses = {
    MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    Boost: "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
    ISC: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
    "The Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
    "Apache 2.0": "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
};

createReadme();