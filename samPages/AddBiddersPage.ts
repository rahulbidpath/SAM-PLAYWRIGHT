import { Page, Locator, test } from "@playwright/test";


export class AddBidders {

    private page: Page;
    private bidders: Locator;
    private remaininguser: Locator;
    private keywords: Locator;
    private search: Locator;
    private check: Locator;
    private registercheckedusers: Locator;
    private popupyes: Locator;
    private approvebidder: Locator;
    private showbidderid: Locator;
    private success1 : Locator;

    constructor(page: Page) {

        this.page = page;
        this.bidders = this.page.locator("xpath=//a[normalize-space()='Bidders']");
        this.remaininguser = this.page.locator("xpath=//a[@id='unassignedUserSection']");
        this.keywords = this.page.locator("xpath=//input[@id='ab11']");
        this.search = this.page.locator("xpath=//input[@id='ab12']");
        this.check = this.page.locator("xpath=//input[@id='ab13chk5014']");
        this.registercheckedusers = this.page.locator("xpath=//input[@id='ab17']");
        this.popupyes = this.page.locator("xpath=//input[@id='aad1']");
        this.approvebidder = this.page.locator("xpath=//table[@id='ab4']//a[@class='bidderapprove']");
        this.showbidderid = this.page.locator("xpath=//td[@class='row0-ab4 ab4-col1 ']");
        this.success1 = this.page.locator("xpath=//p[@class='alert alert-success']");

    }

    async add_Bidders(): Promise<string> {
        let bidder;
        await test.step("Enter Bidders Section And Add Bidder", async () =>{
            await test.step("Enter In Bidder Section", async () =>{    
                await this.bidders.click();
                await this.page.waitForLoadState();
                console.log("ENTER BIDDERS SECTION");
            });
            await test.step("Expand Remaining User For Add User", async () =>{    
                await this.remaininguser.click();
                console.log("Expand Remaining Users Section");
                
                await test.step("In This Section Fill Keyword And Serch", async() =>{
                    await this.keywords.fill("RaoRahul");
                    console.log("Enter Keywords: RaoRahul");

                    await this.search.click();
                    console.log("Click On Search Button");
                });
            });
            await test.step("Select CHeck For Add Bidder And Approve Bidder", async () => {
                await this.check.check();
                console.log("Select Checkbox For User");

                await this.registercheckedusers.click();
                console.log("Click On Register Checked Users Button");

                await this.popupyes.click();
                console.log("Click On Yes In Popup");
                await this.page.waitForLoadState();
                const successmessage = await this.success1.innerText();
                console.log("Message:" + successmessage);
                await this.approvebidder.click();
                await this.page.waitForLoadState();
                console.log("Click On Approve Bidder");
                await this.page.waitForTimeout(5000);
                bidder =  await this.showbidderid.innerText();
                console.log("Verify Bidder Id:",bidder);
            });
        });           
         return bidder;
    };
};
