// simple express server running on port 3000
const port = 5000;
const app = require('express')();
const puppeteer = require('puppeteer');
app.use(require('body-parser').json());
const cheerio = require('cheerio');
const request = require('request');

// let links = 0;
// let progress = 0;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.post('/search', async(req, res) => {
    console.log("search is: " + req.body.search);
    let searchTerm = req.body.search;
    const tokens = searchTerm.split(' ');
    // Encode the tokens using the encodeURIComponent function
    const encodedTokens = tokens.map(encodeURIComponent);
    // Join the encoded tokens using the "+" symbol as a delimiter
    const query = encodedTokens.join('+');
    // Return the Google search URL with the query parameter
    const search_for_links = `https://www.google.com/search?q=${query}`;
    console.log("search_for_links is: " + search_for_links);

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(search_for_links, { waitUntil:
            'networkidle2' });
        const html = await page.content();
        const $ = cheerio.load(html);
        const links = $('a');
        let urls = []
        $(links).each(function(i, link){
            urls[i] = $(link).attr('href');
        }
        );
        browser.close();
        console.log(urls);
        // get the urls from the array that start with https
        let url_only_https = []
        for(let i = 0; i < urls.length; i++) {
            // check if url is null at this index
            if(urls[i] == null) {
                continue;
            } else if(urls[i].startsWith("https")  && !urls[i].includes("google")) {
                url_only_https.push(urls[i]);
            }
        }
        console.log(url_only_https);
        res.send(url_only_https);
    } catch (error) {
        console.error(error);
        res.send("server search error")
    }
});

app.post('/scrape', async(req, res) => {
    console.log("scrape endpoint hit");

    let link = req.body.link;
    let paragraphs1 = [];

    async function scrapeParagraphs(url) {

    // launch a new browser instance
    const browser = await puppeteer.launch();
    // create a new page
    const page = await browser.newPage();
    // navigate to the given URL
    await page.goto(url, { waitUntil: 'networkidle2' });
    // get the HTML content of the page
    const html = await page.content();
    // load the HTML into cheerio
    const $ = cheerio.load(html);
    // select all the paragraphs on the page
    const paragraphs = $('p');
    // create an array to store the paragraph text
    const paragraphText = [];
    // iterate over the paragraphs and add the text to the array
    paragraphs.each((i, element) => {
        paragraphText.push($(element).text());
    });
    // close the browser instance
    browser.close();
    // return the array of paragraph text
    return paragraphText;
    }

    await scrapeParagraphs(link).then(async paragraphs => {
        if(paragraphs.length >= 20) {
            console.log(paragraphs);
            paragraphs1.push(paragraphs);
        }
    })
    res.json(paragraphs1);
    console.log("server scrape finished")

});

app.post('/summarize', (req, res) => {
    scrapedData = req.body.scrape;
    if(scrapedData.length == 0) {
        console.log("no summary");
        res.json(["no summary"]);
    }
    let request = "provide a summary for the following text: " + scrapedData.toString();
    console.log(request);
    console.log("endpoint hit");
    res.json(["server summarize hit"]);
});

app.post('/aggregate', (req, res) => {
    console.log("endpoint hit");
    res.send("server aggregate hit")
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6