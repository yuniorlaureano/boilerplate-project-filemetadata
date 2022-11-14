var express = require('express');
var cors = require('cors');
require('dotenv').config()
let fileuplod = require('express-fileupload');

var app = express();

app.use(fileuplod({
  createParentPath: true
}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  console.log(req.files)
  return res.json({
    "name": req.files.upfile.name,
    "type": req.files.upfile.mimetype,
    "size": req.files.upfile.size
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
