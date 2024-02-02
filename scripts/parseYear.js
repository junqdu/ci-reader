const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('node:fs');

const year = 2024;

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

const output = [];

const get = async () => {
    const res = await fetch(
        `https://www.cranial-insertion.com/archive?year=${year}`,
        requestOptions
    ).then((response) => response.text());

    const dom = new JSDOM(res);
    const entries = dom.window.document.querySelectorAll('.excerpt');

    console.log(entries.length);

    // { "id": 4178, "title": "The Short Winter", "date": "2024-01-29" }
    entries.forEach((entry) => {
        const item = {};

        const date = new Date(
            entry.querySelector('.excerpt-category').textContent
        );
        item.date = date.toISOString();

        const title = entry.querySelector('.excerpt-content a');
        item.title = title.textContent;
        const token = title.href.split('/');
        item.id = token[token.length - 1];

        output.push(item);
    });

    fs.writeFile(
        `./${year}.json`,
        JSON.stringify(output, null, '  '),
        (err) => {}
    );
};

get();
