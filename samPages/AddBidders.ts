import { Page, Locator } from "@playwright/test";


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
        this.success1 = this.page.locator("xpath=//p[@class='alert alert-success']")

    }

    async clickNavigateMenuBidders(): Promise<void> {
        await this.bidders.click();
        await this.page.waitForLoadState();
        console.log("BIDDERS SECTION");
    }

    async clickOnRemainingUser(): Promise<void> {
        await this.remaininguser.click();
        console.log("Expand Remaining Users Section");
    }

    async fillKeywords(name: string): Promise<void>{
        await this.keywords.fill(name);
        console.log("Entering Keywords:", name);
    }

    async clickOnSerch(): Promise<void> {
        await this.search.click();
        console.log("Click On Search Button");
    }

    async checkOnCheck(): Promise<void> {
        await this.check.check();
        console.log("Select Checkbox For User");
    }

    async clickOnRegisterCheckedUsers(): Promise<void> {
        await this.registercheckedusers.click();
        console.log("Click On Register Checked Users Button");
    }

    async clickOnYesButtonOnPopButton(): Promise<void> {
        await this.popupyes.click();
        await this.page.waitForLoadState();
        const successmessage = await this.success1.innerText();
        console.log("Message:" + successmessage);
    }

    async clickOnApproveBidder(): Promise<void> {
        await this.approvebidder.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(5000);
        console.log("Click On Approve Bidder");
    }
    
    async getBidderID(): Promise<string> {
        if(!this.showbidderid) {
            throw new Error("error.");
        }
        const bidder =  await this.showbidderid.innerText();
        console.log("Verify Bidder Id:",bidder);
        return bidder;
    }
}