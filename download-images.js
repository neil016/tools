const https = require('https');
const fs = require('fs');
const path = require('path');

// 下载图片函数
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // 跟随重定向
        return downloadImage(response.headers.location, filePath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status code: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filePath);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('开始下载图片...');
  
  // 创建assets目录
  const assetsDir = path.join(__dirname, 'src', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  // 您上传的两张图片
  const images = [
    { 
      url: 'https://space.coze.cn/s/v184gHtW5Qc/', 
      name: 'background.jpg' 
    },
    { 
      url: 'https://space.coze.cn/s/v1vGd-2g2Og/', 
      name: 'character.png' 
    }
  ];
  
  for (const image of images) {
    const filePath = path.join(assetsDir, image.name);
    try {
      console.log(`下载 ${image.name}...`);
      await downloadImage(image.url, filePath);
      console.log(`✅ ${image.name} 下载成功！`);
    } catch (error) {
      console.error(`❌ ${image.name} 下载失败:`, error.message);
    }
  }
  
  console.log('\n图片下载完成！');
}

main().catch(console.error);
