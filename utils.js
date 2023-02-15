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

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function splitPath(path) {
  const normalizedPath = path.replace(/[\[\].\\]/g, '/');
  return normalizedPath.split('/').filter(Boolean);
}

module.exports = {
  parseBody,
  parseJsonBody,
  isNumeric,
  splitPath,
};
