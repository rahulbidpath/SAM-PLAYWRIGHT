import { Page, test, Locator, expect } from "@playwright/test";
import * as fs from 'fs';

export class LotPage {

    private page : Page;
    private lots : Locator;
    private addlots : Locator;
    private lotname : Locator;
    private saveandaddmore : Locator;
    private buynowprice : Locator;
    private successandmoremessage: Locator;
    private quickimport : Locator;
    private overwriteexistingitemswithmatchingiteam: Locator; 
    private browsecsvfile: Locator;
    private processuploadfile : Locator;
    private successmessageforlotadd: Locator;
    static PAGE_URL: string = "admin/manage-auctions";

    constructor(page: Page) {

        this.page = page;
        this.lots = this.page.locator("xpath=//a[normalize-space()='Lots']");
        this.addlots = this.page.locator("xpath=//input[@id='alf3']");
        this.lotname = this.page.locator("xpath=//input[@id='lip9']");
        this.saveandaddmore = this.page.locator("xpath=//input[@id='lid7']");
        this.buynowprice = this.page.locator("xpath=//input[@id='lip31']");
        this.successandmoremessage = this.page.locator("xpath=//p[@class='alert alert-success']");
        this.quickimport = this.page.locator("xpath=//a[@id='section_qim1']");
        this.overwriteexistingitemswithmatchingiteam = this.page.locator("xpath=//input[@id='liup5']");
        this.browsecsvfile = this.page.locator("xpath=//button[@id='visible-file-input-liup1']");
        this.processuploadfile = this.page.locator("xpath=//input[@id='alf27']")
        this.successmessageforlotadd = this.page.locator("xpath=//p[@class='alert alert-success']");
        
    }

    async isPageOpen(): Promise<boolean> {
        return await this.page.url().includes(LotPage.PAGE_URL)
    }
    getQuickImport() : Locator{
        return this.quickimport;
    }
    async accept_Alert(): Promise<void>{
        this.page.on('dialog', async dialog => {
            console.log('dialogue box displayed');
            await dialog.accept();
        });       
    }

    async add_Lots(lotCount: string,price: string): Promise<void>{
        await test.step("In Lot Section Click On Add Lot Button For Add Lot", async ()=>{
            await test.step("Click On Lots Section", async ()=> {
                await this.lots.click();
                console.log('ENTER LOTS SECTION');
            });  
            await test.step("In Lots Section Click On Add Lot Button", async () =>{  
                await this.addlots.click();
                console.log("Click On Add Lot Button");
            });
            await test.step("Enter In Add Lot And Fill Details Like Lot Name, Buy Price And Click On save And More", async () =>{    
                const count = parseInt(lotCount)
                for(let i = 0; i < count ; i++) {

                    const randomLotName= 'LOT_' + Math.floor(Math.random() * 10000);
                    await this.lotname.fill(randomLotName);
                    console.log("Enter Lot name: " + randomLotName);

                    await this.buynowprice.fill(price);
                    console.log("Enter Buy Price:" + price);

                    await this.saveandaddmore.click();
                    console.log("Click On Save And More Button");
                    const savemessage = await this.successandmoremessage.innerText();
                    console.log("Add Lot Message:" + savemessage);
                }
            });    
        });
    };

    async add_CSV_File_In_Quick_Import(filepath1: string): Promise<void> {
        await test.step("REPORTS SECTION => LOT SECTION And quick Import Lots", async ()=>{ 
            await this.lots.click();
            await this.page.waitForLoadState();
            console.log("Report section => Lot Section");
            await this.accept_Alert();
            await this.overwriteexistingitemswithmatchingiteam.click();
            await this.browsecsvfile.isVisible();
        });
        await test.step("Upload Report For Lots", async () =>{
            await this.page.setInputFiles('input[type="file"]', filepath1);
            console.log("File uploaded:", filepath1);
        });
        await test.step("Click On Process To Upload", async () =>{
            await this.processuploadfile.click();
            const lotaddmessage = await this.successmessageforlotadd.innerText();
            console.log("success message:", lotaddmessage);
        });
        await test.step("Delete CSV File In Project", async ()=>{    
            await fs.unlinkSync(filepath1);
            console.log("Delete Fill:" + filepath1);
        });
    };
};