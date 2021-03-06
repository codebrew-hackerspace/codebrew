#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
var copy = require("recursive-copy");

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    }
  }
];

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers["project-choice"];
  const projectName = answers["project-name"];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${process.cwd()}/${projectName}`);

  copy(templatePath, projectName)
    .then(function(results) {
      console.info("Copied " + results.length + " files");
    })
    .catch(function(error) {
      console.error("Copy failed: " + error);
    });
  x;
});
