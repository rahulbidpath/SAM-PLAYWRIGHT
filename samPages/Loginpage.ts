import { Page, Locator, test } from '@playwright/test';

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
        await test.step("Verify Login Scenario", async () =>{
            
            await test.step("Enter Username", async () =>{
                await this.username.fill(username);
                console.log("Enter Username:" + username);
            }); 
            await test.step("Enter PassWord", async () =>{
                await this.password.fill(password);
                console.log("Enter PassWord:" + password);
            }); 

            await test.step("Click On Login Button", async () =>{
                await this.loginButton.click();
                console.log("Click On Login Button");
            }); 
            
            await test.step("User should be sucessfully logged in", async () =>{
                await this.page.waitForLoadState();
                console.log("User should be sucessfully logged in");
            7}); 
        });           
    };
};


    
    