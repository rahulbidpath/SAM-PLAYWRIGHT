import { Page, Locator } from '@playwright/test';

export class Loginpage{

    private username: Locator;
    private password: Locator;
    private loginButton: Locator;
    private siteLogoImage: Locator;
    static PAGE_URL: string= "admin/login";

    constructor(public page: Page) {
        this.page = page;
        this.username = this.page.locator("xpath=//input[@id='usr']");
        this.password = this.page.locator("xpath=//input[@id='pas']");
        this.loginButton = this.page.locator("xpath=//input[@id='sub']");
        this.siteLogoImage = this.page.locator("xpath=//img[@src='/assets/dist/images/admin/sam-only-white_small.png']");
    }

    getUserNameTextfield() : Locator{
        return this.username;
    }

    getPassWordTextfield() : Locator{
        return this.password;
    }   

    getLoginButton() : Locator{
        return this.loginButton;
    }

    getLogoImage() : Locator{
        return this.siteLogoImage;
    }

    isPageOpen() : boolean {
        return this.page.url().indexOf("admin/login/") > 0;
    }

    async navigateToPage() : Promise<void> {
        if (!await this.isPageOpen()) {
            await this.page.goto(Loginpage.PAGE_URL);
        }
    }

    async loginAsAdmin(username: string, password: string) : Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState();
    }
}

