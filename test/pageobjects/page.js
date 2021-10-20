/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    constructor() {}

    /**
    * Open web url
    * @param {String} website 
    */
    open (website) {
        var pageUrl = website == 'storefront' ? 'https://elguntors-stg.salesfloor.net/reggie' : 'https://elguntors-widgets-stg.salesfloor.net/tests/desktop?lang=en&sf_ip=67.68.215.18';
        return browser.url(pageUrl);
    }
    
    //Scroll down
    scrollToBottom() {
      browser.execute(function () {  
       window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
     });  
   }
}

module.exports = Page;