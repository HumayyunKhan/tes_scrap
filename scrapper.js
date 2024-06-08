
const puppeteer = require("puppeteer")

async function scrapper(data) {
    try {
        console.log(data, "-----------ACCOUNT DATA-HERE--------------")
        const browser = await puppeteer.launch({
            // executablePath:'/usr/bin/google-chrome-stable',
            headless: true,
            args: ['--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });
        const page = await browser.newPage()
        await page.goto(data.site, { waitUntil: 'networkidle2' })

        await page.waitForSelector('input[name="customerID"]');

        await page.type('input[name="customerID"]', data.username);

        // Fill in the password field
        await page.type('input[name="Password"]', data.password);

        console.log("ISNIDE scrapper")
        //   await page.goto(`https://sportsaction77.com/`,{ waitUntil: 'networkidle2' })


        //   await page.waitForSelector('input[name="customerID"]');

        //   await page.type('input[name="customerID"]', 'dyn601');

        //   // Fill in the password field
        //   await page.type('input[name="Password"]', '6161');

        //----------------------- VEGASBET

        //   await page.goto(`https://365vegas.bet/`,{ waitUntil: 'networkidle2' })

        //   await page.waitForSelector('input[name="customerID"]');

        //   await page.type('input[name="customerID"]', 'vgs2683');

        //   // Fill in the password field
        //   await page.type('input[name="Password"]', '666');

        // Click the login button
        // await page.click('button[type="submit"]');
        await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation()])
        const info = await page.evaluate(() => {
            // Find balance and available elements using their respective labels
            const balanceLabel = Array.from(document.querySelectorAll('label')).find(el => el.textContent.trim() === 'Balance');
            // const availableLabel = Array.from(document.querySelectorAll('label')).find(el => el.textContent.trim() === 'Available');

            const balanceValue = balanceLabel ? balanceLabel.nextElementSibling.textContent.trim() : null;
            // const availableValue = availableLabel ? availableLabel.nextElementSibling.textContent.trim() : 'Available not found';

            return balanceValue
        });

        console.log(info)
        await browser.close()
        return info;


    } catch (err) {
        console.log(err)
        return JSON.stringify(err)
    }
}

// const path = require("path")

// const { Builder, By, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// // const chromedriver = require('chromedriver');n

// async function scrapper(data) {
//     try {
//         console.log(data, "-----------ACCOUNT DATA-HERE--------------");

//         // Set up Chrome options
//         const options = new chrome.Options().setBinaryPath("/usr/bin/chromium-browser")
//             .addArguments('--enable-logging')
//             .addArguments('--headless')
//             .setLoggingPrefs({ browser: 'ALL', driver: 'ALL', performance: 'ALL' });
//         options.addArguments('--no-sandbox');
//         options.addArguments('--disable-dev-shm-usage');

//         // Set up a custom user data directory
//         const userDataDir = path.join(__dirname, 'chrome-user-data'); // Adjust the path as needed
//         options.addArguments(`--user-data-dir=${userDataDir}`);

//         // Set up Selenium WebDriver with Chrome
//         const driver = await new Builder()
//             .forBrowser('chrome')
//             .setChromeOptions(options)
//             .build();

//         // Navigate to the website
//         await driver.get(data.site);

//         // Wait for the login form to load
//         await driver.wait(until.elementLocated(By.css('input[name="customerID"]')), 10000);

//         // Enter the username and password
//         await driver.findElement(By.css('input[name="customerID"]')).sendKeys(data.username);
//         await driver.findElement(By.css('input[name="Password"]')).sendKeys(data.password);

//         // Click the login button and wait for navigation
//         await Promise.all([
//             driver.findElement(By.css('button[type="submit"]')).click(),
//             driver.wait(until.urlIs('https://sportsaction77.com/Qubic/StraightLoginSportSelection.php'), 10000)
//         ]);

//         // Find the balance element by its label
//         // const balanceElement = await driver.findElement(By.xpath('//label[text()="Balance"]/following-sibling::span'));

//         // Get the text content of the balance element
//         const balanceValue = "$ 0.0"

//         console.log('Balance:', balanceValue);

//         // Close the browser
//         await driver.quit();

//         return balanceValue;

//     } catch (error) {
//         console.error('An error occurred:', error);
//         return JSON.stringify(error);
//     }
// }

// Example usage:




module.exports = { scrapper }