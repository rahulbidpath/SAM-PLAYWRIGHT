import { Page, Locator, test } from "@playwright/test";

export class CreateAuction {
    private page: Page;
    private createAuction : Locator;
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
        this.createAuction = this.page.locator("xpath=//input[@id='alf2']");
        this.auctionTypeDropdown = this.page.locator("xpath=//select[@id='aip0']");
        this.liveOption = this.page.locator("xpath=//option[normalize-space()='Live']");
        this.allowBiddingConsoleAccessCheckbox = this.page.locator("xpath=//input[@id='aip74']");
        this.startClosingFiled = this.page.locator("xpath=//input[@id='aip94']");
        this.publishDateFiled = this.page.locator("xpath=//input[@id='aip78']");
        this.endDateFiled = this.page.locator("xpath=//input[@id='aip95']");
        this.auctionNameFiled = this.page.locator("xpath=//input[@id='aip13']")
        this.createAuctionButton = this.page.locator("xpath=//input[@id='aef5']");
        this.successCreateauctionmessage = this.page.locator("xpath=//p[@class='alert alert-success']");
    }

    async create_Auctions(option: string, date: string, name: string): Promise<void>{
        await test.step("Creating Auction Through Click on Create New Auction", async () =>{
            await test.step("Click On Auction Section", async () =>{
                await this.createAuction.click();
                console.log("Click on Create New Auction Button");
                await this.page.waitForLoadState();
            });
            await test.step("Dropdown Auction Type And Select Live Auction", async () =>{
                await this.auctionTypeDropdown.click();
                await this.auctionTypeDropdown.selectOption({ label: option });
                const Live = await this.liveOption.innerText();
                console.log("Select Auction Type: " + Live);
            });
            await test.step("Select Date for Allow Bidding Console Accress, Start Closing Date, Publish Date And End Date", async () =>{    
                const yesterdayDate = new Date();
                yesterdayDate.setDate(yesterdayDate.getDate()- 1);
                const yesterdayDateString = yesterdayDate.toLocaleDateString('en-IN');
                await this.allowBiddingConsoleAccessCheckbox.fill(yesterdayDateString);
                console.log("Allow Bidding Console Access:", yesterdayDateString);
               
                const currentDate =new Date();
                const twoDaysAfter = new Date(currentDate);
                twoDaysAfter.setDate(currentDate.getDate() + 2); 
                const twoDaysAfterString = twoDaysAfter.toLocaleDateString('en-IN');
                await this.startClosingFiled.fill(twoDaysAfterString);
                console.log("Start Closing Date:", twoDaysAfterString);

                await this.publishDateFiled.fill(yesterdayDateString);
                console.log("Publish Date:", yesterdayDateString);

                const threeDaysAfter = new Date(currentDate);
                threeDaysAfter.setDate(currentDate.getDate() + 3);
                const threeDaysAfterString = threeDaysAfter.toLocaleDateString('en-IN');
                await this.endDateFiled.fill(threeDaysAfterString);
                console.log("End Date:", threeDaysAfterString);
            });         
            await test.step("Fill Auction Name", async () =>{
                const randomName = 'TEST_' + Math.floor(Math.random()* 10000);
                await this.auctionNameFiled.fill(randomName);
                console.log("Auction name: " + randomName);
            });
            await test.step("Click On Create Auction Button", async () =>{    
                await this.createAuctionButton.click();
                console.log("Click On Create Auction Button");
                await this.page.waitForLoadState();
                const createmessage = await this.successCreateauctionmessage.innerText();
                console.log("Create Auction Message:" + createmessage);
            });
        });
    };
};                                                                                                                                                                                                                                           