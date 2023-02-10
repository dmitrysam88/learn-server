function parseBody(req) {
  return new Promise((resolve, reject) => {
    const body = [];
    req.on('error', (err) => reject(err));
    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => resolve(Buffer.concat(body).toString()));
  });
}

async function parseJsonBody(req) {
  try {
    const body = await parseBody(req);
    return JSON.parse(body);
  } catch (error) {
    return null;
  }
}

module.exports = {
  parseBody,
  parseJsonBody,
};
