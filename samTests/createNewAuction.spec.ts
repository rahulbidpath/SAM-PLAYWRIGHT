import {Page, test, expect} from '@playwright/test';
import { Loginpage } from '../samPages/Loginpage';
import { Homepage } from '../samPages/HomePage';
import { CreateAuction } from '../samPages/CreateAuction';
import { AuctionPage } from '../samPages/AddLots';
import { AddBidders } from '../samPages/AddBidders';
import { EnterBid} from '../samPages/EnterBid';

test.describe('create new auction', () => {
    let page: Page;
    let loginpage: Loginpage;
    let homepage : Homepage;
    let createAuctionPage: CreateAuction;
    let auctionpage : AuctionPage;
    let addbidders : AddBidders;
    let enterbid : EnterBid;
    
    test.beforeEach(async ({ page }) => {
        loginpage = new Loginpage(page);
        homepage = new Homepage(page);
        createAuctionPage = new CreateAuction(page);
        await loginpage.navigateToPage();               
        auctionpage = new AuctionPage(page);
        addbidders = new AddBidders(page);
        enterbid = new EnterBid(page);
    
    });

    test('Verify Sell Lot From Enter Bids Menu Functionality', async ({page}) => {
        //login page open
        await loginpage.loginAsAdmin('admin', '123123');
        expect(await homepage.isPageOpen()).toBeTruthy();

        //navigate to home page
        await homepage.navigateToHomePage();

        //navigate to auction menu
        await homepage.goToAuctionMenu();

        //create new auction
        await homepage.goToCreateNewAuction();
        await createAuctionPage.selectAuctionType('Live');

        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate()- 1);
        const yesterdayDateString = yesterdayDate.toLocaleDateString('en-IN');
        await createAuctionPage.fillAllowBiddingConsoleAccess(yesterdayDateString);

        const currentDate =new Date();
        const twoDaysAfter = new Date(currentDate);
        twoDaysAfter.setDate(currentDate.getDate() + 2);    
        const threeDaysAfter = new Date(currentDate);
        threeDaysAfter.setDate(currentDate.getDate() + 3);
        const twoDaysAfterString = twoDaysAfter.toLocaleDateString('en-IN');
        const threeDaysAfterString = threeDaysAfter.toLocaleDateString('en-IN');
        await createAuctionPage.fillStartClosingDate(twoDaysAfterString);
        await createAuctionPage.fillPublishDate(yesterdayDateString);
        await createAuctionPage.fillEndDate(threeDaysAfterString);

        const randomName = 'TEST_' + Math.floor(Math.random()* 1000);
        await createAuctionPage.fillAuctionName(randomName);
        await createAuctionPage.clickCreateAuctionButton();

        //create Add Lots
        await auctionpage.clickNavigateMenuLots();
        await auctionpage.clickAddLots();
        for(let i = 0; i < 2; i++) {
        const randomLotName= 'LOT_' + Math.floor(Math.random() * 1000);
        await auctionpage.fillLotName(randomLotName);
        await auctionpage.fillBuyNowPrice("200");
        await auctionpage.clickSaveAndAddMore();
        }

        // Add bidders in auction
        await addbidders.clickNavigateMenuBidders();
        await addbidders.clickOnRemainingUser();
        await addbidders.fillKeywords("RaoRahul");
        await addbidders.clickOnSerch();
        await addbidders.checkOnCheck();
        await addbidders.clickOnRegisterCheckedUsers();
        await addbidders.clickOnYesButtonOnPopButton();
        await addbidders.clickOnApproveBidder();
        const bidderId = await addbidders.getBidderID();

        // Enter Bid in Lot
        await enterbid.verify_Enter_Bid_And_Sell_Lot("1","300", bidderId);

    });

});













