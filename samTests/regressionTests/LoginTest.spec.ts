import {test, expect} from '@playwright/test';
import { Loginpage } from '../../samPages/LoginPage';

test.describe('Login Page Tests', () => {
    
    const auth_file_path = 'playwright/.auth/user.json';

    test("Positive Login", async ({page}) => {
        var loginpage = new Loginpage(page);
        loginpage.navigateToPage();
        console.log("Navigated to Login Page");
        await loginpage.loginAsAdmin(process.env.SAM_admin_username??"rahul", process.env.SAM_admin_password??"12");
        console.log("Logged into system as 'sam'");
        await page.context().storageState({path: auth_file_path});
        console.log("Saved current session");
    })

})