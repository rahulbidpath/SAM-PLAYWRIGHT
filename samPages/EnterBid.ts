import { Page, Locator } from "@playwright/test";

export class EnterBid{

    private page: Page;
    private enterbid: Locator;
    private lotfull: Locator;
    private bidamount: Locator;
    private bidderid: Locator;
    private selllot : Locator;
    private successmessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.enterbid = this.page.locator("xpath=//a[normalize-space()='Enter Bids']");
        this.lotfull = this.page.locator("xpath=//input[@id='aeb8']");
        this.bidamount = this.page.locator("xpath=//input[@id='aeb2']");
        this.bidderid = this.page.locator("xpath=//input[@id='aeb3']");
        this.selllot = this.page.locator("xpath=//input[@id='aeb5'] | //input[@value='Sell Lot']");
        this.successmessage = this.page.locator("xpath=//p[@class='alert alert-success']")
    }

    async verify_Enter_Bid_And_Sell_Lot(id: string, price: string, bidderid: string ): Promise<void> {
        console.log('ENTER BIDS SECTION');
        await this.enterbid.click();   

        await this.lotfull.fill(id);
        console.log('Entering Full Lot:'+ id);

        await this.bidamount.fill(price);
        console.log('Entering bid amount:' + price);

        await this.bidderid.fill(bidderid);
        console.log('Entering Bidder Id:' + bidderid);

        await this.selllot.click();
        console.log('Click On Sell Lot Button');
        
        await this.page.waitForLoadState();
        const message = await this.successmessage.innerText();
        console.log('Message:' + message);

    }

}