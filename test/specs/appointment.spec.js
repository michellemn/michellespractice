
import StoreFrontPage from '../pageobjects/storefront.page';

describe('Add Appointment', () => {
    it('Customer should submit appointment request successfully after filling all fields', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openAppointmentForm();
        await StoreFrontPage.fillOptionalFieldForAppointment('Michelle', 'Appointment Test')
        await StoreFrontPage.fillRequiredFieldForAppointment(true, 'michelle@salesfloor.net', '5145780926')
        await StoreFrontPage.submitRequest();
        expect(StoreFrontPage.isRequestSent()).toBeTruthy();
    });

    it('Customer cannot subemit appointment request due to email is missing', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openAppointmentForm();
        await StoreFrontPage.fillAppointmentForm();
        await StoreFrontPage.fillRequiredFieldForAppointment(true, '', '5145780926')
        expect(StoreFrontPage.isSendRequestButtonEnabled()).toBeFalsy();
    });

    it('Customer cannot subemit appointment request due to phone number is missing', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openAppointmentForm();
        await StoreFrontPage.fillAppointmentForm();
        await StoreFrontPage.fillRequiredFieldForAppointment(true, 'michelle@salesfloor.net', '')
        expect(StoreFrontPage.isSendRequestButtonEnabled()).toBeFalsy();
    });

    it('Customer cannot subemit appointment request due to date is not set', async () => {
        
        await StoreFrontPage.open('https://elguntors-stg.salesfloor.net/reggie');
        await StoreFrontPage.openAppointmentForm();
        await StoreFrontPage.fillAppointmentForm();
        await StoreFrontPage.fillRequiredFieldForAppointment(false, 'michelle@salesfloor.net', '5145780926')
        expect(StoreFrontPage.isSendRequestButtonEnabled()).toBeFalsy();
    });
});