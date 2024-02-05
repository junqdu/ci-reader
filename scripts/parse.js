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

const get = async (id) => {
    const output = [];
    const outputMCList = [];

    console.log(`${id} started.`);
    try {
        const res = await fetch(
            `https://www.cranial-insertion.com/article/${id}`,
            requestOptions
        ).then((response) => response.text());

        const qRegex = /Q:.+/g;
        const aRegex = /A:([\s\S]*?)<hr/g;
        const aRegexB = /A:([\s\S]*?)artanchor/g;

        const foundQ = res.match(qRegex);
        let foundA = res.match(aRegex);

        if (foundQ.length !== foundA.length) {
            let foundA2 = res.match(aRegexB);
            foundA2.push(foundA[foundA.length - 1]);
            foundA = foundA2;
        }

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

        let isMC = false;

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

            isMC =
                isMC ||
                !!dom.window.document.querySelectorAll('.specialbox').length;

            const extra = dom.window.document.querySelectorAll('div');
            extra.forEach((el) => (el.outerHTML = ''));
            const extra2 = dom.window.document.querySelectorAll('hr');
            extra2.forEach((el) => (el.outerHTML = ''));

            const [_, ...rest] = dom.window.document.body.innerHTML.split(':');

            // dedup images
            output[idx].imgs = [...new Set(output[idx].imgs)];
            output[idx].a = rest.join(':').replaceAll('\n<br>', '').trim();
        });

        fs.writeFile(
            `./${id}.json`,
            JSON.stringify(output, null, '  '),
            (err) => {}
        );
        if (isMC) {
            fs.appendFile(`./mcs.json`, `${id},\n`, (err) => {});
        }

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

get(id);
// getBatch();
