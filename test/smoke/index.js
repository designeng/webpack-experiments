import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import { expect }   from 'chai';
import cheerio      from 'cheerio';
import chalk        from 'chalk';

import demoPageSpec from '../../src/pages/demo/page.spec';

const smokeTask = () => {
    return wire(demoPageSpec);
}

pipeline([smokeTask]).then(context => {
    let $ = cheerio.load(context.page);
    let collection = $('.nncard');
    expect(collection.length).to.equal(10);
 
    let caption = $('#56e1472aec05c4436b000a16').find('h4').text();
    let str = 'Российский офис Subaru';
    expect(caption.slice(0, str.length)).to.equal(str);
}).otherwise(error => console.error(chalk.red("ERROR:::"), chalk.blue(error)));