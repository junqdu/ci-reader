const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('node:fs');
const data = require('./2023.json');

const args = process.argv.slice(2);
const id = args[0] || 4160;

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

const output = [];

const get = async (id) => {
    try {
        const res = await fetch(
            `https://www.cranial-insertion.com/article/${id}`,
            requestOptions
        ).then((response) => response.text());

        // const qRegex = /Q:.+/g;
        // const aRegex = /A:.+/g;
        const qRegex = /Q:.+/g;
        const aRegex = /A:.+/g;

        const foundQ = res.match(qRegex);
        const foundA = res.match(aRegex);

        foundQ.forEach((q) => {
            const item = { imgs: [] };
            const dom = new JSDOM(q);
            const links = dom.window.document.querySelectorAll('a');

            // console.log(dom.window.document.body.textContent);
            // console.log(dom.window.document.body.textContent.split(':'));
            item.q = dom.window.document.body.textContent.split(':')[1].trim();
            const [_, ...rest] =
                dom.window.document.body.textContent.split(':');
            item.q = rest.join(':').trim();

            links.forEach((link) => {
                const tokens = link.href.split('=');
                item.imgs.push(decodeURIComponent(tokens[tokens.length - 1]));
                // console.log(link.innerText);
            });
            // console.log(links[0].href);

            output.push(item);
        });

        foundA.forEach((ans, idx) => {
            const dom = new JSDOM(ans);
            const manas = dom.window.document.querySelectorAll('.mana');
            manas.forEach((mana) => {
                // const num = mana.src.split('.');
                mana.outerHTML = mana.outerHTML
                    .replace('"i', '"/ci-reader/i')
                    .replace('gif', 'png');
            });

            output[idx].a = dom.window.document.body.innerHTML
                .split(':')[1]
                .replace('<br>', '')
                .trim();
        });

        fs.writeFile(
            `./${id}.json`,
            JSON.stringify(output, null, '  '),
            (err) => {}
        );
    } catch (e) {
        console.log(`${id} failed to fetch`);
        console.log(e);
    }
};

const getBatch = async () => {
    data.forEach((datum) => {
        get(datum.id);
    });
};

// get(4142);
getBatch();
