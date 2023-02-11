async function parseBody(req) {
  const body = [];
  for await (chunk of req) {
    body.push(chunk)
  }
  return Buffer.concat(body).toString();
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
