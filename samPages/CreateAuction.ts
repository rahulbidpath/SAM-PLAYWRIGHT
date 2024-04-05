import { Page, Locator } from "@playwright/test";

export class CreateAuction {
    private page: Page;
    private auctionTypeDropdown: Locator;
    private liveOption: Locator;
    private allowBiddingConsoleAccessCheckbox: Locator;
    private startClosingFiled: Locator;
    private publishDateFiled: Locator;
    private endDateFiled: Locator;
    private createAuctionButton: Locator;
    private auctionNameFiled: Locator;
    private successCreateauctionmessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.auctionTypeDropdown = this.page.locator("xpath=//select[@id='aip0']");
        this.liveOption = this.page.locator("xpath=//option[normalize-space()='Live']");
        this.allowBiddingConsoleAccessCheckbox = this.page.locator("xpath=//input[@id='aip74']");
        this.startClosingFiled = this.page.locator("xpath=//input[@id='aip94']");
        this.publishDateFiled = this.page.locator("xpath=//input[@id='aip78']");
        this.endDateFiled = this.page.locator("xpath=//input[@id='aip95']");
        this.auctionNameFiled = this.page.locator("xpath=//input[@id='aip13']")
        this.createAuctionButton = this.page.locator("xpath=//input[@id='aef5']");
        this.successCreateauctionmessage = this.page.locator("xpath=//p[@class='alert alert-success']")
    }

    async selectAuctionType(option: string): Promise<void> {
        await this.auctionTypeDropdown.click();
        await this.auctionTypeDropdown.selectOption({ label: option });
        const Live = await this.liveOption.innerText();
        console.log("Select Auction Type: " + Live);
    }

    async fillAllowBiddingConsoleAccess(date: string): Promise<void> {
        await this.allowBiddingConsoleAccessCheckbox.fill(date);
        console.log("Allow Bidding Console Access:", date);
    }

    async fillStartClosingDate(date: string): Promise<void> {
        await this.startClosingFiled.fill(date);
        console.log("Start Closing Date:", date);
    }

    async fillPublishDate(date: string): Promise<void> {
        await this.publishDateFiled.fill(date);
        console.log("Pubish Date:", date);
    }

    async fillEndDate(date: string): Promise<void> {
        await this.endDateFiled.fill(date);
        console.log("End Date:", date);
    }

    async fillAuctionName(name: string): Promise<void> {
        await this.auctionNameFiled.fill(name);
        console.log("Auction name: " + name);
    }

    async clickCreateAuctionButton(): Promise<void> {
        await this.createAuctionButton.click();
        console.log("Click On Create Auction Button");
        await this.page.waitForLoadState();
        const createmessage = await this.successCreateauctionmessage.innerText();
        console.log("Create Auction Message:" + createmessage);
    }
}                                                                                                                                                                                                                                           