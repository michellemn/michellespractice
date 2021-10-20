import Page from './page';

class SideBarPage extends Page {

    //Create instance to initialize elements associated with SideBarPage
    constructor() {
        super();
    }

     /**
     * define selectors with XPath using getter methods
     */
    get repPictures () { return $('//img[@alt= "Testy Rep0 Tester Rep0"]')} 
    get peronalShopperOption () { return $('//a[@id= "landing-finder-link"]')}
    get selectStore () { return $('//select[@id= "store"]')}
    get customerNameField () { return $('//input[@id= "name"]')}
    get customerEmailField () { return $('//input[@id= "email"]')}
    get budgetField () { return $('//input[@id= "minBudgetText"]')}
    get customerPhoneField () { return $('//input[@id= "phone"]')}
    get customerMessage () { return $('//textarea[@id= "extraInfo"]')}
    get enabledSendRequestBtn () { return $('//button[text()= "Send Request"]')}

    /**
    * Open sidebar widget url
    * 
    * @param {String} website 
    */
    async open(website) {
     await super.open(website);
    }  

    //Click sidebar to open landing page
    async openLandingPage(){
        //switch to iframe of sidebar
        await browser.pause(3000);
        const idframe = await $('//iframe[@id="sf-widget-companion"]');
        await browser.switchToFrame(idframe); 
        
        //Check element on iframe is visble and click it to open landing page
        await browser.pause(1000);
        await $('//h1[text()= "Ask an Associate"]').click();  
    }  

    //Select Personal Shopper service form
    async openPersonalShopperServiceForm(){
         //Switch to iframe of personal shopper service form
         await browser.pause(3000);
         const frame = await $('//iframe[@id="sf-services-landing"]');
         await browser.switchToFrame(frame);
    
        //Open personal shopper service form
         await this.peronalShopperOption.click();
    }

    /**
    * Customer enters optional information in personal shopper service form
    * 
    * @param {String} customerName
    * @param {int} budget
    * @param {String} phoneNumber
    * @param {String} message
    */
    async fillOptionalfieldsForPersonalShopper(customerName, budget, phoneNumber, message){
        //Select store from list. "Toronto" is the 2nd element and index is 1.
        await this.selectStore.click();
        await this.selectStore.selectByIndex(1);

        //Eneter customer's name
        await this.customerNameField.click();
        await this.customerNameField.setValue(customerName);
        
        //Enter number for customer's buget
        await this.budgetField.click();
        await this.budgetField.setValue(budget);

        //Enter customer's phone number
        await this.customerPhoneField.click();
        await this.customerPhoneField.setValue(phoneNumber);

        //Enter message for customer
        await this.customerMessage.click();
        await this.customerMessage.setValue(message);
    }

    /**
    * Customer enters required information in personal shopper service form
    * 
    * @param {String} customerEmail
    */
    async fillRequiredfieldsForPersonalShopper(customerEmail){
        await this.customerEmailField.click();
        await this.customerEmailField.setValue(customerEmail);
    }

    //Customer submits request
    async submitRequest()
    {
        await this.enabledSendRequestBtn.click();
    }

     /**
    * Get disabled send request button
    * 
    * @return element disabledSendRequestBtn
    */
   async getDisabledSendButton()
   {
       return this.disabledSendRequestBtn;
   }

   /**
   * Verify 'THANK YOU FOR YOUR REQUEST' is shown after request submission
   * 
   * @return element send request confirmation 
   */
   getRequestConfirmation()
   {
       return $('.message.global-services__validation').waitForExist(5000);
   }
        
}
export default new SideBarPage();