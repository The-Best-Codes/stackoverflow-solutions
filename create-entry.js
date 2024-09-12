const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .option('url', {
        describe: 'StackOverflow URL to scrape',
        demandOption: true,
        type: 'string'
    })
    .argv;

function extractFolderName(url) {
    const match = url.match(/questions\/\d+\/([^/?]+)/);
    return match ? match[1] : 'unknown-question';
}

async function scrapeStackOverflow(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $('h1[itemprop="name"]').text().trim() || 'unknown';
        const user = $('.user-details a').first().attr('href') || 'unknown';

        const folderName = extractFolderName(url);

        const folderPath = path.join(__dirname, folderName);
        fs.mkdirSync(folderPath, { recursive: true });

        const readmePath = path.join(folderPath, 'README.md');
        const readmeContent = `## Solution:

<!-- Describe the problem and how you solved it -->

## References:

<!-- Resources you used to solve the question -->
`;
        fs.writeFileSync(readmePath, readmeContent);

        const currentDate = new Date();
        const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}-${currentDate.getFullYear()}`;
        const formattedTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

        const yamlPath = path.join(folderPath, 'solve_data.yaml');
        const yamlContent = `url: ${url}
title: "${title}"
user: https://stackoverflow.com${user}
date: ${formattedDate}
time: "${formattedTime}"
`;
        fs.writeFileSync(yamlPath, yamlContent);

        console.log(`Scraping completed. Files created in folder: ${folderName}`);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

scrapeStackOverflow(argv.url);