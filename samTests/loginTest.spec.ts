import {test, expect} from '@playwright/test';
import { Loginpage } from '../samPages/Loginpage';

test.describe('Login Page Tests', () => {
    
    const auth_file_path = 'playwright/.auth/user.json';

    test("Positive Login", async ({page}) => {
        var loginpage = new Loginpage(page);
        loginpage.navigateToPage();
        console.log("Navigated to Login Page");
        await loginpage.loginAsAdmin("admin", "123123");
        console.log("Logged into system as 'sam'");
        await page.context().storageState({path: auth_file_path});
        console.log("saved current session");
    })

    test("Verify on Login Page", async({page}) =>{
        var loginpage = new Loginpage(page);
        page.context().clearCookies();
        await test.step("Open sam Lofin Screen", async () =>{
            await loginpage.navigateToPage();
            expect(loginpage.getUserNameTextfield()).toBeVisible();
            expect(loginpage.getPassWordTextfield()).toBeVisible();
            expect(loginpage.getLoginButton()).toBeVisible();
        })
    })
})