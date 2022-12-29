import puppeteer from 'puppeteer';

(async () => {
    let input = {
        emailAddress: "tutorialsacc322@gmail.com",
        password: "zku896liFmint!",
        cashAccountName: "SOLWallets",
        wallets: ['']
    }

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://mint.intuit.com');
    const loginbtn = await page.$eval('.BDJB__buttons :nth-child(2)', el => el.href)
    await page.goto(loginbtn)

    await page.focus('[data-testid="IdentifierFirstIdentifierInput"]')
    await page.keyboard.type(input.emailAddress)
    let signinBtn = await page.waitForSelector('[data-testid="IdentifierFirstSubmitButton"]');
    await signinBtn.click()

    await page.waitForSelector('[aria-label="Password"]')
    await page.focus('[aria-label="Password"]')
    await page.keyboard.type(input.password)
    let continueBtn = await page.waitForSelector('[data-testid="passwordVerificationContinueButton"]');
    await continueBtn.click()

    let skipBtn = await page.waitForSelector('[data-testid="VUUSkipButton"]');
    await skipBtn.click()

    //Ensure we use propPage Object
    const propPage = await browser.newPage();
    await propPage.goto('https://mint.intuit.com/settings?filter=property');

    const propEl = await propPage.waitForSelector('.Accountsstyle__AccountItemSummaryContainer-in0bd9-17')
    await propEl.click()

    //No $,  .
    //const totalVal = getWalletValuesFromSolScan(input.wallets)
    const totalValStr = '1211.89'
    await propPage.evaluate(() => document.querySelectorAll('.Accountsstyle__StyledTextField-in0bd9-30')[1].value = '');
    const valBoxes = await propPage.$$('.Accountsstyle__StyledTextField-in0bd9-30')
    await valBoxes[1].click({ clickCount: 3 })
    await valBoxes[1].type(totalValStr)

    await propPage.keyboard.press("Tab")
    let saveBtn = await propPage.waitForSelector('.dtybYf.button-enabled')
    await saveBtn.click()

})()

function getWalletValuesFromSolScan() {

}