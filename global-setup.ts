import {FullConfig, test as base} from '@playwright/test';


async function globalSetup(config: FullConfig) {

    if(config.projects[0].use.baseURL?.includes("qa-dev-auto.auctionserver.net")) {
        process.env.SAM_admin_username = 'admin';
        process.env.SAM_admin_password = '123123';
    }
}

export default globalSetup;
