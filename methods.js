const db = require('./db/index');

async function get(url, body) {
  const dataExists = await db.exists(url);

  if (!dataExists) return `Data ${url} is not exists in database`;

  return db.get(url);
}

async function post(url, body) {
  await db.push(url, body);

  return body;
}

async function put(url, body) {
  const dataExists = await db.exists(url);

  if (!dataExists) return `Data ${url} is not exists in database`;

  await db.push(url, body);

  return body;
}

async function patch(url, body) {
  const dataExists = await db.exists(url);

  if (!dataExists) return `Data ${url} is not exists in database`;

  const oldData = await db.get(url);
  const newData = { ...oldData, ...body};

  await db.push(url, newData);

  return newData;
}

async function del(url, body) {
  const dataExists = await db.exists(url);

  if (!dataExists) return `Data ${url} is not exists in database`;

  await db.delete(url);

  return url;
}

module.exports = { get, post, put, patch, delete: del };
