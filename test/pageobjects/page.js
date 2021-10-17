/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    constructor() {}

    /**
    * Open web url
    * @param {String} path 
    */
    open (path) {
        return browser.url(path);
    }

    /**
    * Switch to iframe
    * @param {String} name 
    */
    selectIFrame(name) {
    
       browser.pause(100000);
       $(`//div/following::iframe[@id= "${name}"]`).waitForExist({ timeout: 10000 });
       expect($(`//div/following::iframe[@id= "${name}"]`)).toExist();
       let iframe = browser.$(`//div/following::iframe[@id= "${name}"]`);
        browser.pause(5000);
        browser.switchToFrame(iframe);
        browser.setTimeout({ 'implicit': 10000 })
      }
    
    //Scroll down
    scrollToBottom() {
      browser.execute(function () {  
       window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
     });  
   }
}

module.exports = Page;