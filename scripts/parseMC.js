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

    console.log(`${id} started.`);
    try {
        const res = await fetch(
            `https://www.cranial-insertion.com/article/${id}`,
            requestOptions
        ).then((response) => response.text());
        const dom = new JSDOM(res);

        // const qRegex = /Q:.+/g;
        // const aRegex = /A:.+/g;
        const qRegex = /<span id="q([\s\S]*?)artanchor([\s\S]*?)<span/g;
        // const aRegex = /<b>A:([\s\S]*?)<hr/g;

        const foundQ = res.match(qRegex);
        const foundA = dom.window.document.querySelectorAll('div.specialbox');

        // console.log('length:' + foundQ.length);
        // console.log('length:' + foundA.length);

        foundQ.forEach((q) => {
            const item = { imgs: [] };
            const dom2 = new JSDOM(q);

            // process symbols
            const manas = dom2.window.document.querySelectorAll('.mana');
            manas.forEach((mana) => {
                mana.outerHTML = mana.outerHTML
                    .replace('"i', '"/ci-reader/i')
                    .replace('gif', 'png');
            });

            // process card image
            const images = dom2.window.document.querySelectorAll('.autocard');
            images.forEach((link) => {
                const tokens = link.href.split('=');
                const cardName = decodeURIComponent(tokens[tokens.length - 1]);
                item.imgs.push(cardName);
                link.outerHTML = `<span class="autocard">${cardName}</span>`;
            });

            item.q = dom2.window.document.body.innerHTML.split(':')[1].trim();
            const [_, ...rest] = dom2.window.document.body.innerHTML.split(':');
            item.q = rest.join(':').replace('<br>', '').trim();

            // dedup images
            item.imgs = [...new Set(item.imgs)];

            output.push(item);
        });

        // console.log(output.length);

        foundA.forEach((ans, idx) => {
            // console.log(idx);
            // const dom = new JSDOM(ans);

            // process symbols
            const manas = ans.querySelectorAll('.mana');
            manas.forEach((mana) => {
                mana.outerHTML = mana.outerHTML
                    .replace('"i', '"/ci-reader/i')
                    .replace('gif', 'png');
            });

            // process card image
            const images = ans.querySelectorAll('.autocard');
            images.forEach((link) => {
                const tokens = link.href.split('=');
                const cardName = decodeURIComponent(tokens[tokens.length - 1]);
                output[idx].imgs.push(cardName);
                link.outerHTML = `<span class="autocard">${cardName}</span>`;
            });

            // console.log(ans.innerHTML);
            // const [_, ...rest] = ans.body.innerHTML.split(':');

            output[idx].a = ans.childNodes[0].innerHTML;
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
    const arr = [4157, 4102, 4052, 3998, 3912];
    for (const datum of arr) {
        await get(datum);
    }
    // data.forEach((datum) => {
    //     await get(datum.id);
    // });
};

// get(3912);
getBatch();
