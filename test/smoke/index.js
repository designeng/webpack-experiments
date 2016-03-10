import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import chai,  { expect }  from 'chai';
import cheerio      from 'cheerio';

import demoPageSpec from '../../src/pages/demo/page.spec';

const smokeTask = () => {
    return wire(demoPageSpec);
}

pipeline([smokeTask]).then(context => {
    let $ = cheerio.load(context.page);
    let rootItemElementCollection = $('.nncard');
    expect(rootItemElementCollection.length).to.equal(13);

    let item = $('#56e1472aec05c4436b000a16');
    let caption = item.find('h4').text();
    let str = 'Российский офис Subaru';
    let strLength = str.length;
    expect(caption.slice(0, strLength)).to.equal(str);
}).otherwise(error => console.error("ERROR:::", error));