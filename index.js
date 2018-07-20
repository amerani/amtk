#!/usr/bin/env node
const { exec } =  require('child_process');
const chalk = require('chalk');

console.log(chalk.white('npx amtk\n'));

console.log(chalk.bgCyan('installing global npm pakcages...\n'))

let command = 'npm install -g yarn';
command = ["typescript", "ts-node", "@babel/core", "@babel/cli", "webpack", "webpack-command", "eslint", "tslint"]
.reduce((acc, cur) => acc.concat(` && yarn global add ${cur}`), command);

let text = ''
const set = new Set();
const npmi = exec(command);
npmi.stdout.on('data', data => {
      text = text + data;

      const y = text.match(/\+ yarn@.*[\r\n]*.*\ds/gi);
      y && y.forEach(s => {
            if(s.trim() != '') {
                  if(!set.has(s)) {
                        set.add(s);
                        console.log(chalk.blue(s) + '\n');
                  }
            }
      })

      const suc = text.match(/(success Installed\s.*[\r\n]*.*[[\r\n]*.*[\r\n]*.*[\r\n]*.*\ds.)/gi)
      suc && suc.forEach(s => {
            // s = s.split(' ').map(x => x.trim()).join(' ');
            if(s.trim() != '') {
                  if(!set.has(s)){
                        set.add(s);
                        console.log(chalk.blue(s) + '\n');
                  }
            }
      })
});
npmi.stderr.on('data', data => {
      const r = /(warning).*/
      while(data.search(r) >= 0) {
            data = data.replace(r, '')
      }
      if(data.trim() != '') {
            console.log(data);
      }
});
npmi.on('close', code => {
      if(code === 0) {
            console.log(chalk.green(`\nsuccessfully installed global npm packages`))
      } else {
            console.log(chalk.red(`\nerror installing global npm packages`))
      }
})