const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('node:fs');
const data = require('./2024.json');

const args = process.argv.slice(2);
const id = args[0] || 4160;

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

const get = async (id) => {
    const output = [];

    console.log(`${id} started.`);
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

            // process symbols
            const manas = dom.window.document.querySelectorAll('.mana');
            manas.forEach((mana) => {
                mana.outerHTML = mana.outerHTML
                    .replace('"i', '"/ci-reader/i')
                    .replace('gif', 'png');
            });

            // process card image
            const images = dom.window.document.querySelectorAll('.autocard');
            images.forEach((link) => {
                const tokens = link.href.split('=');
                const cardName = decodeURIComponent(tokens[tokens.length - 1]);
                item.imgs.push(cardName);
                link.outerHTML = `<span class="autocard">${cardName}</span>`;
            });

            item.q = dom.window.document.body.innerHTML.split(':')[1].trim();
            const [_, ...rest] = dom.window.document.body.innerHTML.split(':');
            item.q = rest.join(':').replace('<br>', '').trim();

            output.push(item);
        });

        foundA.forEach((ans, idx) => {
            const dom = new JSDOM(ans);

            // process symbols
            const manas = dom.window.document.querySelectorAll('.mana');
            manas.forEach((mana) => {
                mana.outerHTML = mana.outerHTML
                    .replace('"i', '"/ci-reader/i')
                    .replace('gif', 'png');
            });

            // process card image
            const images = dom.window.document.querySelectorAll('.autocard');
            images.forEach((link) => {
                const tokens = link.href.split('=');
                const cardName = decodeURIComponent(tokens[tokens.length - 1]);
                output[idx].imgs.push(cardName);
                link.outerHTML = `<span class="autocard">${cardName}</span>`;
            });

            const [_, ...rest] = dom.window.document.body.innerHTML.split(':');

            output[idx].a = rest.join(':').replace('<br>', '').trim();
        });

        fs.writeFile(
            `./${id}.json`,
            JSON.stringify(output, null, '  '),
            (err) => {}
        );
        console.log(`${id} ended.`);
    } catch (e) {
        console.log(`${id} failed to fetch`);
        console.log(e);
    }
};

const getBatch = async () => {
    for (const datum of data) {
        await get(datum.id);
    }
    // data.forEach((datum) => {
    //     await get(datum.id);
    // });
};

// get(4170);
getBatch();
