import { Page, Locator } from "@playwright/test";

export class AuctionPage {

    private page : Page;
    private lots : Locator;
    private addlots : Locator;
    private lotname : Locator;
    private saveandaddmore : Locator;
    private buynowprice : Locator;
    private successandmoremessage: Locator;
    static PAGE_URL: string = "admin/manage-auctions";

    constructor(page: Page) {

        this.page = page;
        this.lots = this.page.locator("xpath=//a[normalize-space()='Lots']");
        this.addlots = this.page.locator("xpath=//input[@id='alf3']");
        this.lotname = this.page.locator("xpath=//input[@id='lip9']");
        this.saveandaddmore = this.page.locator("xpath=//input[@id='lid7']");
        this.buynowprice = this.page.locator("xpath=//input[@id='lip31']");
        this.successandmoremessage = this.page.locator("xpath=//p[@class='alert alert-success']");
    }

    async isPageOpen(): Promise<boolean> {
        return await this.page.url().includes(AuctionPage.PAGE_URL)
    }

    async clickNavigateMenuLots(): Promise<void> {
        await this.lots.click();
        await this.page.waitForLoadState();
        console.log('LOTS SECTION');
    }

    async clickAddLots(): Promise<void> {
        await this.addlots.click();
        await this.page.waitForLoadState();
        console.log("Click On Add Lot");
    }

    async fillLotName(name: string): Promise<void> {
        await this.lotname.fill(name);
        console.log("Entering Lot name: " + name);

    }

    async fillBuyNowPrice(price: string): Promise<void> {
        await this.buynowprice.fill(price);
        console.log("Entering Buy Price:" + price);
    }

    async clickSaveAndAddMore(): Promise<void> {
        await this.saveandaddmore.click();
        console.log("Click On Save And More Button");
        const savemessage = await this.successandmoremessage.innerText();
        console.log("Add Lot Message:" + savemessage);
    }
}