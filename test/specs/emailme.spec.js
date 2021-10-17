import StoreFrontPage from '../pageobjects/storefront.page';

describe('Email Me', () => {
    it('Customer can submit Email Me request successfully with a subscrption', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openEmailMeForm();
        await StoreFrontPage.fillOptionalFieldForEmailMe('Michelle', true)
        await StoreFrontPage.fillRequiredFieldForEmailMe('michelle@salesfloor.net', 'Can you share an update?')
        await StoreFrontPage.submitRequest();
        expect(StoreFrontPage.isRequestSent()).toBeTruthy();
    });

    it('Customer can submit Email Me request successfully without a subscrption', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openEmailMeForm();
        await StoreFrontPage.fillOptionalFieldForEmailMe('Michelle', false)
        await StoreFrontPage.fillRequiredFieldForEmailMe('michelle@salesfloor.net', 'Can you share an update?')
        await StoreFrontPage.submitRequest();
        expect(StoreFrontPage.isRequestSent()).toBeTruthy();
    });

    it('Customer cannot submit Email Me request due to email is missing', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openEmailMeForm();
        await StoreFrontPage.fillRequiredFieldForEmailMe('', 'Can you share an update?')
        expect(StoreFrontPage.isSendRequestButtonEnabled()).toBeFalsy();
    });

    it('Customer cannot submit Email Me request due to empty question field', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openEmailMeForm();
        await StoreFrontPage.fillRequiredFieldForEmailMe('michelle@salesfloot.net', '')
        expect(StoreFrontPage.isSendRequestButtonEnabled()).toBeFalsy();
    });

    it('Customer can close Email Me service form successful', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openEmailMeForm();
        await StoreFrontPage.fillOptionalFieldForEmailMe('Michelle', true)
        await StoreFrontPage.fillRequiredFieldForEmailMe('michelle@salesfloot.net', 'Can you share an update?')
        await StoreFrontPage.closeServiceForm();
        expect(StoreFrontPage.isServiceFormOpen()).toBeFalsy();
    });
});    