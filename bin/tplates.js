const package = require('../package.json');
const process = require('process');
const utils = require('./utils');
const { join } = require('path');

var templates = utils.getAvailableTemplates();

//TODO: Info command that displays the description and the files inside the template

// Parse arguments
const args = process.argv.slice(2);

if(args.length < 1){
  utils.printUsage();
  process.exit(1);
}

else if(args[0] === 'list'){
  console.log("Available templates:");
  templates.forEach(template => {
    console.log(" - " + utils.highlightGreen(template) + ": " + utils.getTemplateDescription(template));
  });
  console.log("\nTo copy a template, use: tplates <template name>");
  process.exit(0);
}

else if(args[0] === 'version'){
  console.log(package.version);
  process.exit(0);
}

else if(templates.includes(args[0])){
  utils.copyTemplate(args[0]);
  console.log("\nTemplate copied to current directory.");
  process.exit(0);
}

else{
  console.log(utils.highlightRed("\nUnknown template or command: " + args[0]));
  utils.printUsage();
  process.exit(1);
}
