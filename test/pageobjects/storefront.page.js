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
    get setTimeField () { return $('//select[@id= "choosenTime"]')}
    get customerNameField () { return $('//input[@id= "name"]')}
    get customerEmailField () { return $('//input[@id= "email"]')}
    get subscriptionCheckbox () { return $('//input[@id= "autoSubscribe"]')}
    get customerPhoneField () { return $('//input[@id= "phone"]')}
    get customerMessage () { return $('//textarea[@id= "extraInfo"]')}
    get questionField () { return $('//textarea[@id= "questionField"]')}
    get enabledSendRequestBtn () { return $('//button[text()= "Send Request"]')}
    get closeBtn () { return $('//button[@Class= "reveal__close-button proper-icon-close"]')}
    
    /**
    * Open StoreFrontPage url
    * 
    * @param {String} path 
    */
    async open(path) {
        await super.open(path);
    }

    /**
    * Get title of live chat
    * 
    * @return {String} live chat title
    */
    async getLiveChatTitle() {
        return this.textLiveChat.getText();
        
       // await this.statusTextColor.getCSSProperty('color');
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
       this.selectIFrame('bookAnAppointment');
    }

    //Open Email me service form
    async openEmailMeForm() {
       //Click email me service form 
       this.addQuestionLink.click();
       //Switch to iframe of email me
       this.selectIFrame('ContactMe');
    }

    /**
    * Customer enters optional information in appointment form
    * 
    * @param {String} customerName
    * @param {String} message
    */
    async fillOptionalFieldForAppointment(customerName, message) {
        //Selet Phone as appointment type
        browser.pause(1000);
        await this.phoneTypeAppointment.isExisting();
        await this.phoneTypeAppointment.isClickable();
        await this.phoneTypeAppointment.click()

        //Set appointment time
        await this.setTimeField.isClickable();
        await this.setTimeField.click();
        await this.setTimeField.selectByIndex(2);

        //Enter customer's name
        await this.customerNameField.isVisible();
        await this.customerNameField.click();
        await this.customerNameField.setValue(customerName);   
        
        //Enter message to rep
        await this.customerMessage.isVisible();
        await this.customerMessage.click();
        await this.customerMessage.setValue(message);
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
        //if customer clicks set date field, will continue to set date
        if (isDateFieldClicked){
           //Set appointment date
           await this.setDateField.isVisible();
           await this.setDateField.isClickable();
           await this.setDateField.click();

            browser.pause(500);
            await this.calendarTable.isVisible();
        
            //Calculate appointment date in 7 days
            //If date is greater than last date of current month, it automatically converts to the date in next month
            var date = new Date();
            var currentMonth = date.getMonth();
            var appointmentDate = date.setDate(date.getDate() + 7);
            var appointmentMonth = appointmentDate.getMonth();
            var numOfDate = appointmentDate.getDate();
            
            //If appointment is in next month, click next month button to move to next month calendar
            //Select appointment date
            if (appointmentMonth > currentMonth){
                await this.nextMonthBtn.isVisible();
                await this.nextMonthBtn.click();
                browser.pause(500);
                await this.calendarTable.isVisible();
                await $(`//a[@class= "ui-state-default" and text()= "${numOfDate}"]`).click();
            } else if (appointmentMonth == currentMonth){
                //Select appointment date in currently month
                await $(`//a[@class= "ui-state-default" and text()= "${numOfDate}"]`).click();
            }
        }
        
        //Enter customer's email address
        await this.customerEmailField.isVisible();
        await this.customerEmailField.click();
        await this.customerEmailField.setValue(customerEmail);

        //Enter customer's phone number
        await this.customerPhoneField.isVisible();
        await this.customerEmailField.click();
        await this.customerEmailField.setValue(phoneNumber);
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
        await this.customerNameField.isVisible();
        await this.customerNameField.click();
        await this.customerNameField.setValue(customerName); 

        //If customer wants to subscribe, then click checkbox
        if (isSubscribed)
        {
            await this.subscriptionCheckbox.isClickable();
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
        await this.customerEmailField.isVisible();
        await this.customerEmailField.click();
        await this.customerEmailField.setValue(customerEmail);

        //Enter customer's question
        await this.questionField.isVisible();
        await this.questionField.isClickable();
        await this.questionField.setValue(question);
    }

    //Customer submits request
    async submitRequest()
    {
        this.scrollToBottom();
        browser.pause(500);
        await this.enabledSendRequestBtn.waitForVisible();
        await this.enabledSendRequestBtn.isClickable();
        await this.enabledSendRequestBtn.click();
    }

    //Customer closes service form
    closeServiceForm()
    {
        this.closeBtn.scrollIntoView();
        browser.pause(500);
        this.closeBtn.waitForVisible();
        this.closeBtn.isClickable();
        this.closeBth.click();
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

     /**
    * Verify service form is open
    * 
    * @return {boolean} both name field and email field are visible
    */
    isServiceFormOpen()
    {
        return this.customerNameField.isVisible() && this.customerEmailField.isVisible();
    }
}

export default new StoreFrontPage();