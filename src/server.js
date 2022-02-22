var express = require('express');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(`${__dirname}/build`));
// var port = process.env.PORT || 8080;
app.listen(process.env.PORT, () => console.log(`Server running on port ${port}`));