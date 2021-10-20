import Page from './page';

class StoreFrontPage extends Page {

    //Create instance to initialize elements associated with StoreFrontPage
    constructor() {
       super();
    }

    /**
     * define selectors with XPath using getter methods
     */
    get textLiveChat () { return $('//h2[text() = "Live Chat"]') }
    get liveChatStatus (){ return $('//span[text() = "Unavailable"]') }
    get statusTextColor () { return $('//span[contains(@class, "status__text--is-off")]')}
    get addAppointmentLink () { return $('//a[@id= "AtAppointmentLink"]')}
    get addQuestionLink () { return $('//a[@id= "AtQuestionLink"]')}
    get phoneTypeAppointment () { return $('//input[@value= "phone"]')}
    get setDateField () { return $('//input[@name= "choosenDatePlaceholder"]')}
    get calendarTable () { return $('//table[@class= "ui-datepicker-calendar"]')}
    get nextMonthBtn () { return $('//span[text()= "Next"]')}
    get setTimeField () { return $('//label[@for= "phoneService"]')}
    get customerNameField () { return $('//input[@id= "name"]')}
    get customerEmailField () { return $('//input[@id= "email"]')}
    get subscriptionCheckbox () { return $('//input[@id= "autoSubscribe"]')}
    get customerPhoneField () { return $('//input[@id= "phone"]')}
    get customerMessage () { return $('//textarea[@id= "extraInfo"]')}
    get questionField () { return $('//textarea[@id= "questionField"]')}
    get enabledSendRequestBtn () { return $('//button[text()= "Send Request"]')}
    get disabledSendRequestBtn () { return $('//button[@type= "submit" and @disabled]')}
    get closeBtn () { return $('//div[@style= "display: block;"]/following::div/following::button[@type= "button" and @class= "reveal__close-button proper-icon-close"]')}
    
    
    /**
    * Open StoreFrontPage url
    * 
    * @param {String} website 
    */
    async open(website) {
        await super.open(website);
    }

    /**
    * Get title of live chat
    * 
    * @return {String} live chat title
    */
    async getLiveChatTitle() {
        return this.textLiveChat.getText();
    }

    /**
    * Get current availability of live chat
    * 
    * @return {String} live chat availability
    */
    async getLiveChatAvailability(){
        return this.liveChatStats.getText();  
    }

    /**
    * Get color of unavailable live chat icon
    * It doesn't work and need to check with Marco
    * 
    * @return value of style.color of unavailable live chat icon
    */
    async getValueOfUnavailableLiveChat() {
    
     return this.statusTextColor.getCSSProperty('color');
    }

    //Open appointment service form
    async openAppointmentForm() {
       //Click appointment service form
       this.addAppointmentLink.click();
       //Switch to iframe of appointment
       await browser.pause(3000);
       const idframe = await $('//iframe[@id="bookAnAppointment"]');
       await browser.switchToFrame(idframe);  
    }

    //Open Email me service form
    async openEmailMeForm() {
       //Click email me service form 
       this.addQuestionLink.click();
       
       //Switch to iframe of email me
       await browser.pause(3000);
       const idframe = await $('//iframe[@id="ContactMe"]');
       await browser.switchToFrame(idframe);  
    }

    /**
    * Customer enters optional information in appointment form
    * 
    * @param {String} customerName
    * @param {String} message
    */
    async fillOptionalFieldForAppointment(customerName, message) {
        //Selet Phone as appointment type
        browser.setTimeout({ 'implicit': 5000 });
       
        //Enter customer's name
       await this.customerNameField.click();
       await this.customerNameField.setValue(customerName);  

        //Enter message to rep
        await this.customerMessage.click();
        await this.customerMessage.setValue(message);

        //Select phone type appointment. 
        await $('//label[@for= "phoneService"]').click();
    }

    /**
    * Customer enters required information in appointment form
    * Method is also reuseable to test validation for required fields 
    * 
    * @param {boolean} isDateFieldClicked
    * @param {String} customerEmail
    * @param {String} phoneNumber
    */
    async fillRequiredFieldForAppointment(isDateFieldClicked, customerEmail, phoneNumber)
    {
        browser.pause(500);
        //Enter customer's email address
        await this.customerEmailField.click();
        await this.customerEmailField.setValue(customerEmail);

        //Enter customer's phone number
        await this.customerPhoneField.click();
        await this.customerPhoneField.setValue(phoneNumber);
        
        //if customer clicks set date field, will continue to set date
          if (isDateFieldClicked == true){
           //Set appointment date
           await this.setDateField.isClickable();
           await this.setDateField.click();

            browser.pause(500);
            //await this.calendarTable.isVisible();
        
            //Calculate dynamic appointment date in 7 days
            //If date is greater than last date of current month, it automatically converts to the date in next month
            const numOfDaysForAppointment = 7;
            var date = new Date();
            var currentMonth= date.getMonth();
            var appointmentDate = new Date(new Date().setDate(new Date().getDate() + numOfDaysForAppointment));
            var numOfDate = appointmentDate.getDate();
            var numOfMonth = appointmentDate.getMonth();

            const dateOnCalendar = await $(`//a[@class= "ui-state-default" and text()= "${numOfDate}"]`);
            
            //If appointment is in next month, click next month button to move to next month calendar
            //Select appointment date
            if (numOfMonth > currentMonth){
                await this.nextMonthBtn.click();
                browser.pause(500);
                await dateOnCalendar.click();
            } 
                //Select appointment date in currently month
                await dateOnCalendar.click();
          
                //Set appointment time
                //await this.setTimeField.click();
                await $('//select[@id= "choosenTime"]').selectByIndex(1);
        }
        
    }

    /**
    * Customer enters optional information in Email me service form
    * 
    * @param {String} customerName
    * @param {boolean} isSubscribed
    */
    async fillOptionalFieldForEmailMe(customerName, isSubscribed) 
    {

        //Enter customer's name
        await this.customerNameField.click();
        await this.customerNameField.setValue(customerName); 

        //If customer wants to subscribe, then click checkbox
        if (isSubscribed == true)
        {
            await this.subscriptionCheckbox.click();
        }
    }

    /**
    * Customer enters required information in Email me service form
    * 
    * @param {String} customerEmail
    * @param {String} question
    */
    async fillRequiredFieldForEmailMe(customerEmail, question) 
    {
        //Enter customer's email address
        await this.customerEmailField.click();
        await this.customerEmailField.setValue(customerEmail);

        //Enter customer's question
        await this.questionField.setValue(question);
    }

    //Customer submits request
    async submitRequest()
    {
        this.scrollToBottom();
        browser.pause(500);
        await this.enabledSendRequestBtn.click();
    }

    //Customer closes service form
    async closeServiceForm()
    {
        await browser.pause(3000);
        this.closeBtn.scrollIntoView();
        await this.closeBtn.click();
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

     /**
    * Verify service form is open
    * 
    * @return element field in service form
    */
    getFieldFromServiceForm()
    {
        return this.customerNameField;
    }
}

export default new StoreFrontPage();