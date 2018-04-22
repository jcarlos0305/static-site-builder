#!/usr/bin/env node

const figlet = require('figlet');
const gitCloneRepo = require('git-clone-repo').default;
const inquirer = require('inquirer');
const fs = require('fs');

var welcome = new Promise(function (resolve, reject) {
    figlet('Welcome', {
        font: 'Star Wars',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err)
            reject(err)
        else
            resolve(data);
    });
})

var questions = [{
        type: 'input',
        name: 'name',
        message: 'Enter the website name ..'
    },
    {
        type: 'list',
        name: 'bootstrap',
        message: 'Do you want to use bootstrap ... ',
        choices: [
            'Bootstrap v3.3.7',
            'Bootstrap v4.0.0',
            'None'
        ]
    }
];

welcome
    .then(function (data) {
        console.log(data);
        console.log('\nAnswer the following questions ');
        inquirer.prompt(questions).then(answers => {
            console.log('\nCreating website...');
            gitCloneRepo('https://github.com/jcarlos0305/static-site-generator.git', { destination: answers.name });
            let bootstrap = 'None';
            if (answers.bootstrap === 'Bootstrap v3.3.7') {
                bootstrap = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
            } else if (answers.bootstrap === 'Bootstrap v4.0.0') {
                bootstrap = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
            }
            fs.writeFileSync(`${answers.name}/options/bootstrap.yml`, `---\nbootstrap: ${bootstrap}\n---`);
            console.log('\n\nYour new website is ready! To start working on it:');
            console.log('\n - Move to the folder');            
            console.log(`\n     cd ${answers.name}`);
            console.log('\n - Install the dependencies');            
            console.log('\n     npm install');
            console.log('\n - Start the development server');            
            console.log('\n     npm start');
            console.log('\n - To create new page run:');
            console.log('\n     new-page name [--layout layout-name]');
            console.log('\n - To deploy the project run:');
            console.log('\n     npm run build\n\n\n');

        });
    })
    .catch(function (error) {
        console.log(error.message);
    });
