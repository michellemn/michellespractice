import SideBarPage from '../pageobjects/sidebar.page';

describe('View Sidebar', () => {
    it('Customer can submit peronal shopper request successfully from sidebar', async () => {
        await SideBarPage.open('sidebar widget page');
        await SideBarPage.openLandingPage();
        await SideBarPage.openPersonalShopperServiceForm();
        await SideBarPage.fillOptionalfieldsForPersonalShopper('Michelle', '100', '5145780926', 'Can you share an update?');
        await SideBarPage.fillRequiredfieldsForPersonalShopper('michelle@salesfloor.net');
        await SideBarPage.submitRequest();
        expect(SideBarPage.isRequestSent()).toBeTruthy;  
    });

    it('Customer cannot submit peronal shopper request due to email is missing', async () => {
        await SideBarPage.open('sidebar widget page');
        await SideBarPage.openLandingPage();
        await SideBarPage.openPersonalShopperServiceForm();
        await SideBarPage.fillRequiredfieldsForPersonalShopper('');
        expect(SideBarPage.isSendRequestButtonEnabled).toBeFalsy;  
    });
});