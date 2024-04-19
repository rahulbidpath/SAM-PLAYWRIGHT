import { Page, Locator, test } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';

export class Reports{ 

    private page: Page;
    private reports : Locator;
    private csvimportreadyexport : Locator;
    private downloadDir: string; 

    constructor(page: Page, downloadDir: string) {
        this.page = page;
        this.reports = this.page.locator("xpath=//ul[@class='open-sub-menu']//a[@title='Reports'][normalize-space()='Reports']");
        this.csvimportreadyexport = this.page.locator("xpath=//span[text()='CSV import-ready export']");
        this.downloadDir = downloadDir;
    }

    async generate_Reports(): Promise<string> {
        await test.step("Enter In Reports Section", async () =>{
            await this.reports.click();
            console.log("ENTER REPORTS SECTION");
            await this.page.waitForLoadState();
        });         
            const downloadPromise = this.page.waitForEvent('download');
            await this.csvimportreadyexport.click();
            const download =await downloadPromise;
            const filepath = '..\\SAM-PLAYWRIGHT\\Download\\'
            await download.saveAs(filepath + download.suggestedFilename());
            const downloadfilename = download.suggestedFilename();
            console.log("Download File Name:" + downloadfilename);

            await download.saveAs(path.join(this.downloadDir, downloadfilename));
            console.log("Download Directory:", this.downloadDir);

            const csvData = fs.readFileSync(path.join(this.downloadDir, downloadfilename), 'utf-8');

            const rows: string[] = csvData.split('\n');

            const columns: string[] = rows[1].split(',');
            columns[6] = '"1"';
            rows[1] = columns.join(',');
    
            const updateCSV: string = rows.join('\n');
        

            const filepath1 = path.join(this.downloadDir, downloadfilename);
            console.log("File path:", filepath1);
            fs.writeFileSync(filepath1, updateCSV);
            console.log(`update csv file save: ${filepath1}`);
            return filepath1;
    };
};
