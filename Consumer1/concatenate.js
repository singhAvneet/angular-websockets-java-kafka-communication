const fs = require('fs-extra');
const concat = require('concat');

concatenate = async () =>{
    const files = [
      './dist/kafka-ws-frontend/runtime-es2015.js',
      './dist/kafka-ws-frontend/polyfills-es2015.js',  
      './dist/kafka-ws-frontend/main-es2015.js'
      ];

      await fs.ensureDir('output/consumer');
      await concat(files, 'output/consumer/consumerone-wc.js');
}
concatenate();