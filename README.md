# SAM-PLAYWRIGHT

This project is for automated tests in SAM. The project is a ***node.js*** project.

the project uses **Playwright** for writing automation scripts.

To get started with project, follow these setps for cloning the project:

1. Dowload and install VS code(you can use other IDEs as well)
1. Open a VS code terminal.
2. Navigate to the directory where you want to clone the project.
3. Use the 'git clone' command followed by the project's repository URL.

    git clone https://github.com/rahulbidpath/SAM-PLAYWRIGHT.git

## Installations

Before you begin, make sure you have the following installed on your system:
- **node.js**: version **v21.7.1**
- **npm**: version **10.5.0**

## Building Project

To resolve all the required packages for this project, run the following command in yout terminal:

```bash
   npm install
```

## Executing Tests

To run the "samTests", execute the following command for all tests in your terminal:

```bash
   npx playwright test  --headed --debug
```

For running single file, execute following command

```bash
   npx playwright test example.spec.ts  --headed --debug
```
 
## Viewing Test Results

After running the tests, the project generates a single report:

1. **Report**: This report provides a comprehensive overview of the test results.

To view the report, playwright-report/index.html