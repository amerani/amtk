#!/usr/bin/env node
const { exec } =  require('child_process');
const chalk = require('chalk');

let command = 'npm install -g yarn';
command = ["webpack", "typescript", "webpack-command", "ts-node", "@babel/core", "@babel/cli"]
.reduce((acc, cur) => acc.concat(` && yarn global add ${cur}`), command);

let text = ''
const set = new Set();
const npmi = exec(command);
npmi.stdout.on('data', data => {
      text = text + data;
      const suc = text.match(/(success Installed\s.*[\r\n]*.*[[\r\n]*.*[\r\n]*.*[\r\n]*.*\ds.)/gi)
      suc && suc.forEach(s => {
            if(!set.has(s)){
                  set.add(s);
                  console.log(chalk.blue(s));
            }
      })
});
npmi.stderr.on('data', data => {
      const r = /(warning).*/
      while(data.search(r) >= 0) {
            data = data.replace(r, '')
      }
      console.log(data);
});
npmi.on('close', code => {
      if(code === 0) {
            console.log(chalk.green(`\ninstalled global npm packages successfully`))
      } else {
            console.log(chalk.red(`\nerror installing global npm packages`))
      }
})