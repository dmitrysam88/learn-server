const keys = {
  port: ['port', 'p'],
  dbFilename: ['db', 'database'],
};

const defaultValues = {
  port: '3000',
  dbFilename: 'myDataBase.json',
};

const normalize = (text) => text.replace(/-/g, '').toLowerCase();

const config = {};

function getConfig() {
  if (Object.keys(config).length) return config;

  Object.assign(config, defaultValues);

  const args = process.argv.splice(2);

  for(let i = 0; i < args.length; i += 2) {
    const key = Object.entries(keys).find(([key, val]) => val.includes(normalize(args[i])));
    if (!key) continue;
    config[key[0]] = args[i + 1];
  }

  return config;
}

module.exports = {
  getConfig,
};
