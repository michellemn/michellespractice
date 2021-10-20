
import StoreFrontPage from '../pageobjects/storefront.page';

describe('View Storefront', () => {
    it('Customer should see name of service form is LIVE CHAT from storefront page', async () => {
        await StoreFrontPage.open('storefront');
        expect(StoreFrontPage.getLiveChatTitle()).toHaveText('LIVE CHAT');
    });

    it('Customer should see Live Chat is unavailable from storefront', async () => {
        await StoreFrontPage.open('storefront');
        expect(StoreFrontPage.getLiveChatAvailability()).toHaveText('Unavailable');     
    });

    it('Customer should see icon of unavailable Live Chat is red', async () => {
        await StoreFrontPage.open('storefront');
        expect(StoreFrontPage.getValueOfUnavailableLiveChat()).toHaveValueContaining('rgba(238,12,12,1)');     
    });
});