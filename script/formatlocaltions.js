#!/usr/bin/env node

const { once } = require('events');
const fs = require('fs');
const { createInterface } = require('readline');

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: fs.createReadStream('localtions.txt'),
      crlfDelay: Infinity
    });

    const res = [];

    rl.on('line', (line) => {
      var item = line.split('&');
      res.push({
        name: item[0],
        localtion: item[1],
        tel: item[2],
        image: 'images/mendianfenbu/beigonda.jpeg',
        // map: 'https://map.baidu.com/search/%E6%9D%91%E4%B8%8A%E4%B8%80%E5%B1%8B(%E6%96%B0%E5%8C%97%E5%B7%A5%E5%A4%A7%E5%BA%97)/@12967197.685,4822393.41,13.75z?querytype=s&da_src=shareurl&wd=%E6%9D%91%E4%B8%8A%E4%B8%80%E5%B1%8B(%E6%96%B0%E5%8C%97%E5%B7%A5%E5%A4%A7%E5%BA%97)&c=131&src=0&wd2=%E5%8C%97%E4%BA%AC%E5%B8%82%E6%9C%9D%E9%98%B3%E5%8C%BA&pn=0&sug=1&l=14&b=(12949429.46,4823629.33;12972469.46,4836397.33)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&sug_forward=4cd6ec8785d6e2eb01294fe0&device_ratio=2'
      });
      console.log(res);
      fs.writeFileSync('localtion.json', JSON.stringify(res));
    });

    await once(rl, 'close');

    console.log('文件已处理');
  } catch (err) {
    console.error(err);
  }
})();