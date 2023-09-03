const express = require('express');
const path = require('path');

const app = express();

const fs = require('fs');

function getImgFiles(folderPath) {
  const files = fs.readdirSync(folderPath);
  const imgFiles = files.filter(file => {
    const extension = path.extname(file).toLowerCase();
    return extension === '.jpg' || extension === '.webp' || extension === '.png' || extension === '.gif';
  });
  return imgFiles;
}

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));
app.use('/img', express.static(path.resolve(__dirname, 'public', 'static', 'img')));

app.get('/photos/:folderPath', (req, res) => {
  const folderPath = req.params.folderPath;
  const imgFiles = getImgFiles(path.resolve(__dirname, 'public', 'static', 'img', 'section-catalog', folderPath, 'jpd_smal'));  
  const photoUrls = imgFiles.map(fileName => `/img/section-catalog/${folderPath}/jpd_smal/${fileName}`);
  res.send( photoUrls );


  //return {photoUrls: photoUrls}
});

// const folderPath = path.resolve(__dirname, 'frontend', 'static', 'img', 'section-catalog', 'Dushechca_Blue_Rose');
// const imgFiles = getImgFiles(folderPath);
// console.log(imgFiles);




app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('Server working GOOD'));

