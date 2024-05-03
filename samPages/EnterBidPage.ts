import { Page, Locator, test } from "@playwright/test";

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
        this.successmessage = this.page.locator("xpath=//p[@class='alert alert-success']");
    }
    
    async verify_Enter_Bid_And_Sell_Lot(id: string, price: string, bidderid: string ): Promise<void> {
        let message;
        await test.step("Enter In Bids Section and Enter Bid For Lot", async ()=>{
            await test.step("Enter In Bids Section", async () =>{
                await this.enterbid.click();
                console.log('ENTER BIDS SECTION');   
            });
            await test.step("Enter Lot Id", async () => {    
                await this.lotfull.fill(id);
                console.log('Enter Full Lot:'+ id);
            });
            await test.step("Enter Bid Price For Lot", async () => {    
                await this.bidamount.fill(price);
                console.log('Enter Bid Amount:' + price);
            });
            await test.step("Enter Bidder Id", async () =>{    
                await this.bidderid.fill(bidderid);
                console.log('Enter Bidder Id:' + bidderid);
            });
            await test.step("Click On Sell Lot Button", async () =>{
                await this.selllot.click();
                console.log('Click On Sell Lot Button');
            });
            await test.step("Show Message For Successfull Sell Lot For Biider", async () =>{    
                message = await this.successmessage.innerText();
                console.log('Message:' + message);
            });
        });
        return message;
    };
};