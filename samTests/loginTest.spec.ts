import {test, expect} from '@playwright/test';
import { Loginpage } from '../samPages/LoginPage';

test.describe('Login Page Tests', () => {
    
    const auth_file_path = 'playwright/.auth/user.json';

    test("Positive Login", async ({page}) => {
        var loginpage = new Loginpage(page);
        loginpage.navigateToPage();
        console.log("Navigated to Login Page");
        await loginpage.loginAsAdmin("admin", "123123");
        console.log("Logged into system as 'sam'");
        await page.context().storageState({path: auth_file_path});
        console.log("Saved current session");
    })

    test("Verify on Login Page", async({page}) =>{
        var loginpage = new Loginpage(page);
        page.context().clearCookies();
        await test.step("Open sam Login Screen", async () =>{
            await loginpage.navigateToPage();
            expect(loginpage.getUserNameTextfield()).toBeVisible();
            expect(loginpage.getPassWordTextfield()).toBeVisible();
            expect(loginpage.getLoginButton()).toBeVisible();
        })
    })
})