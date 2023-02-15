const http = require('http');
const { getConfig } = require('./config');
const methods = require('./methods');
const { parseJsonBody } = require('./utils');
const path = require('path');

const server = http.createServer(async (req, res) => {
  const method = methods[req.method.toLowerCase()];

  if (typeof method !== 'function') {
    res.writeHead(400)
    res.end('Wrong method');
  }

  const body = await parseJsonBody(req);
  const data = await method(req.url, body);

  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(data));
});

server.listen(getConfig().port, () => {
  console.log(`Data base is ${path.join(__dirname, getConfig().dbFilename)}`);
  console.log('Server is working');
  console.log(`http://localhost:${getConfig().port}/`);
});
