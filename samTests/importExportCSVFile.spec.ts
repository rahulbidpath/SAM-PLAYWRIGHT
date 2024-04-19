import {Page, test, expect} from '@playwright/test';
import { Loginpage } from '../samPages/LoginPage';
import { Homepage } from '../samPages/HomePage';
import { CreateAuction } from '../samPages/CreateAuctionPage';
import { LotPage } from '../samPages/AddLotsPage';
import { AddBidders } from '../samPages/AddBiddersPage';
import { EnterBid} from '../samPages/EnterBidPage';
import { Reports } from '../samPages/ReportsPage';

test.describe('Import Export CSV File', () => {
    let page: Page;
    let loginpage: Loginpage;
    let homepage : Homepage;
    let createAuctionPage: CreateAuction;
    let lotpage : LotPage;
    let addbidders : AddBidders;
    let enterbid : EnterBid;
    let reports : Reports;
    
    test.beforeEach(async ({ page }) => {
        loginpage = new Loginpage(page);
        homepage = new Homepage(page);
        createAuctionPage = new CreateAuction(page);
        await loginpage.navigateToPage();               
        lotpage = new LotPage(page);
        addbidders = new AddBidders(page);
        enterbid = new EnterBid(page); 
        reports = new Reports(page, '..\\SAM-PLAYWRIGHT\\Download\\');   
    });

    test('"Import ready csv export” → re-upload using lots “Quick Import” works as expected', async ({page}) => {
            //login page open
        await loginpage.loginAsAdmin(process.env.SAM_admin_username??"rahul", process.env.SAM_admin_password??"12");

            //navigate to home page
        await homepage.home_page();

            //create auction
        await createAuctionPage.create_Auctions('Live','date' ,'name');

            //add lots
        await lotpage.add_Lots("2","200");

            //add bidders in auction
        const bidderId = await addbidders.add_Bidders();
      
            //enter bid and sell lot
        await enterbid.verify_Enter_Bid_And_Sell_Lot("1","300", bidderId);

            //generate reports 
        const filepath1 = await reports.generate_Reports();            

            //In Lot Section Add Lots Using CSV File Upload and Check Success Message
        await lotpage.add_CSV_File_In_Quick_Import(filepath1);
     });
});
    














