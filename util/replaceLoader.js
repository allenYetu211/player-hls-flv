const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

const findFile = ({
  fileName
}) => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(process.cwd(), fileName);
    return readFile(filePath, resolve, reject);
  })
}


const readFile = (filePath, resolve, reject) => {
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      reject(err);
      return
    }
    resolve(data);
  })
}

const writeFile = (fileName, content) => {
  fs.writeFile( path.resolve(process.cwd(), fileName), content, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}


// 更新版本号
const getNextVersion = (version) => {
  const V4 = version.match(/\d+/g);
  const next = parseInt(V4.pop()) + 1;
  if (next === 100) {
    return [getNextVersion(V4.join('.')), 0].join('.');
  } else {
    V4.push(next)
    return V4.join('.');
  }
}


module.exports = async function () {
  const fileContent = await findFile({ fileName: 'package.json' });
  const package  = JSON.parse(fileContent);
  package.version =  getNextVersion(package.version);
  writeFile('package.json', JSON.stringify(package, null, 4));
  return package.version;
}