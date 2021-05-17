const fs = require('fs-extra');
const concat = require('concat');

concatenate = async () =>{
    const files = [
      './dist/kafka-ws-frontend/runtime-es2015.js',
      './dist/kafka-ws-frontend/polyfills-es2015.js',  
      './dist/kafka-ws-frontend/main-es2015.js'
      ];

      await fs.ensureDir('output/producer');
      await concat(files, 'output/producer/producer-wc.js');
}
concatenate();