const puppeteer = require('puppeteer');
const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.youtube.com/');
        await page.waitForSelector("input#search")
        await page.type('input#search', "Puppeteer")
        await waitFor(1000);
        await page.click('button#search-icon-legacy');
        await waitFor(1000);
        const search = await page.evaluate(() => {
            const elements = document.querySelectorAll(".ytd-video-renderer #video-title")
            const search = []

            console.log(elements)
            for(let element of elements){
                search.push(element.href);
            }
        });
        console.log(search)
    } catch (error) {
        console.error('Error:', error);
    }
})();
