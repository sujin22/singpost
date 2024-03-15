
const fs = require('fs');
const path = require('path');

//1. google maps key 맵핑

const googleHtmlFilePaths = [
  'dist/detail.html',
  'dist/schedule.html',
]

const googleMapsAPIKey = process.env.GOOGLE_MAP_KEY;

for(filePath of googleHtmlFilePaths){
  let html = fs.readFileSync(filePath, 'utf-8');
  // 구글 맵 API 키로 대체
  html = html.replace('__GOOGLE_MAPS_API_KEY__', googleMapsAPIKey);
  
  // 대체된 내용을 다시 파일에 쓰기
  fs.writeFileSync(filePath, html, 'utf-8');
}

//2. data, img 파일 deploy
const sourcePaths = [
  './data/all-route',
  './data/input-data',
  './data/all-route-by-car',
  './img'
];// 배포할 파일들이 위치한 디렉토리 경로

function deployFiles(sourceDirectory, deployDirectory) {
  fs.readdir(sourceDirectory, (err, files) => {
    if (err) {
      console.error(`Failed to read files from ${sourceDirectory}`);
      console.error(err);
      return;
    }

     // deployDirectory에 해당하는 디렉토리 생성
    fs.mkdirSync(deployDirectory, { recursive: true });

    files.forEach(file => {
      const sourcePath = path.join(sourceDirectory, file);
      const deployPath = path.join(deployDirectory, file);

      fs.copyFile(sourcePath, deployPath, err => {
        if (err) {
          console.error(`Failed to deploy ${file}`);
          console.error(err);
        } else {
          console.log(`Deployed ${file}`);
        }
      });
    });
  });
}

for(sourcePath of sourcePaths){
  const deployPath = './dist'+sourcePath.slice(1); // 배포할 경로
  console.log(deployPath);
  deployFiles(sourcePath, deployPath);
}