import {Page, test, expect} from '@playwright/test';
import { Loginpage } from '../../samPages/LoginPage';
import { Homepage } from '../../samPages/HomePage';
import { CreateAuction } from '../../samPages/CreateAuctionPage';
import { LotPage } from '../../samPages/AddLotsPage';
import { AddBidders } from '../../samPages/AddBiddersPage';
import { EnterBid} from '../../samPages/EnterBidPage';
import { Reports } from '../../samPages/ReportsPage';

test.describe('Import Export CSV File Test', () => {
    let page: Page;
    let loginpage: Loginpage;
    let homepage : Homepage;
    let createAuctionPage: CreateAuction;
    let lotpage : LotPage;
    let AddBiddersPage : AddBidders;
    let EnterBidPage : EnterBid;
    let ReportsPage : Reports;
    
    test.beforeEach(async ({ page }) => {
        loginpage = new Loginpage(page);
        await loginpage.navigateToPage();               
        homepage = new Homepage(page);
        createAuctionPage = new CreateAuction(page);
        lotpage = new LotPage(page);
        AddBiddersPage = new AddBidders(page);
        EnterBidPage = new EnterBid(page); 
        ReportsPage = new Reports(page, '..\\SAM-PLAYWRIGHT\\Download\\');   
    });

    test('"Import ready csv export” → re-upload using lots “Quick Import” works as expected', async ({page}) => {
            //login page open
        await loginpage.loginAsAdmin(process.env.SAM_admin_username??"rahul", process.env.SAM_admin_password??"12");

            //navigate to home page
        await homepage.home_page();
        

            //create auction
        const createmessage =await createAuctionPage.create_Auctions('Live');
        expect(createmessage).toContain('Success Auction saved');

            //add lots
        const savemessage =await lotpage.add_Lots("2","200");
        expect(savemessage).toContain('Success')
            //add bidders in auction
        const bidderId = await AddBiddersPage.add_Bidders();
      
            //enter bid and sell lot
        const message =await EnterBidPage.verify_Enter_Bid_And_Sell_Lot("1","300", bidderId);
        expect(message).toContain('successfully sold to bidder');

            //generate reports 
        const filepath1 = await ReportsPage.generate_Reports();            

            //In Lot Section Add Lots Using CSV File Upload and Check Success Message
        const lotaddmessage =await lotpage.add_CSV_File_In_Quick_Import(filepath1);
        expect(lotaddmessage).toContain('lots updated');
     });
});
    














