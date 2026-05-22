const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('⏳ 开始获取图片...');

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error('Status ' + response.statusCode));
        return;
      }
      
      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    const assetsDir = path.join(__dirname, 'src', 'assets');
    
    console.log('📥 下载背景图...');
    await download('https://space.coze.cn/s/v184gHtW5Qc/', path.join(assetsDir, 'background.jpg'));
    console.log('✅ 背景图保存成功!');
    
    console.log('📥 下载人物图...');
    await download('https://space.coze.cn/s/v1vGd-2g2Og/', path.join(assetsDir, 'character.png'));
    console.log('✅ 人物图保存成功!');
    
    console.log('\n🎉 所有图片下载完成！');
  } catch (err) {
    console.error('❌ 下载失败:', err);
  }
}

main();
