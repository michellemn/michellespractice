import Page from './page';

class SideBarPage extends Page {

    //Create instance to initialize elements associated with SideBarPage
    constructor() {
        super();
    }

     /**
     * define selectors with XPath using getter methods
     */
    get repPictures () { return $('//div[@id= "rep-pictures"]')} 
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
    * @param {String} path 
    */
    async open(path) {
     await super.open(path);
    }  

    //Click sidebar to open landing page
    async openLandingPage(){
        //switch to iframe of sidebar
        this.selectIFrame('sf-widget-companion');
        browser.pause(1000);
        
        //Check element on iframe is visble and click it to open landing page
        await this.repPictures.isVisible();
        await this.repPictures.click();  
    }  

    //Select Personal Shopper service for,
    async openPersonalShopperServiceForm(){
        //Open personal shopper service form
        await this.peronalShopperOption.isVisible();
        await this.peronalShopperOption.isClickable();
        await this.personalShopperOption.click();
        //Switch to iframe of personal shopper service form
        this.selectIFrame('sf-services-landing');
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
        await this.selectStore.waitForVisible();
        await this.selectStore.isClickable();
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
        await this.customerEmailField.isVisible();
        await this.customerEmailField.isClickable();
        await this.customerEmailField.click();
        await this.customerEmailField.setValue(customerEmail);
    }

    //Customer submits request
    async submitRequest()
    {
        await this.enabledSendRequestBtn.waitForVisible();
        await this.enabledSendRequestBtn.isClickable();
        await this.enabledSendRequestBtn.click();
    }

    /**
    * Verify send request button is visible
    * 
    * @return {boolean} send request button is visiable
    */ 
    isSendRequestButtonEnabled()
     {
         return this.enabledSendRequestBtn.isVisible();
     }
 
    /**
    * Verify 'THANK YOU FOR YOUR REQUEST' is shown after request submission
    * 
    * @return {boolean} send request confirmation is visible
    */
    isRequestSent()
     {
         return $('.message.global-services__validation').waitForExist(5000).isVisible();
     }
        
}
export default new SideBarPage();