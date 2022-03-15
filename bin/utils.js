const fs = require('fs');
const { join } = require('path');

module.exports = {

  printUsage(){
    console.log("\nUsage: tplates [option]");
    console.log("Options:");
    console.log("  " + this.highlightGreen("<template name>") + "         Copies the template to the current directory");
    console.log("  " + this.highlightGreen("list") + "                    Lists all available templates");
    console.log("  " + this.highlightGreen("version") + "                 Prints version");
  },


  copyTemplate(templateName){
    const templatePath = join(__dirname, '..', 'templates', templateName);
    this.copyDirContentsRecursive(templatePath, '.');
  },

  copyDirContentsRecursive(src, dest){
    const files = fs.readdirSync(src);

    files.forEach(file => {
      if(file == '.desc') return;
      const srcPath = join(src, file);
      const destPath = join(dest, file);
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()){
        fs.mkdirSync(destPath);
        this.copyDirContentsRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  },

  getAvailableTemplates(){
    const templates = fs.readdirSync(join(__dirname, '..', 'templates'));
    return templates;
  },

  getTemplateDescription(template){
    const templatePath = join(__dirname, '..', 'templates', template);
    const description = fs.readFileSync(join(templatePath, '.desc'), 'utf8');

    return description;
  },

  highlightGreen(text){
    return "\x1b[32m" + text + "\x1b[0m";
  },

  highlightRed(text){
    return "\x1b[31m" + text + "\x1b[0m";
  }
};