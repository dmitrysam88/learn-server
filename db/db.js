const fs = require('fs');
const { splitPath, isNumeric } = require('../utils');

class jsonDB {
  constructor(dbFilepath) {
    this.dbFilepath = dbFilepath;
    if (!fs.existsSync(this.dbFilepath)) {
      fs.writeFileSync(this.dbFilepath, '{}', 'utf8');
    };
  };

  async readFile() {
    const textData = await fs.promises.readFile(this.dbFilepath, 'utf8');
    return JSON.parse(textData);
  }

  async writeFile(data) {
    const textData = JSON.stringify(data);
    await fs.promises.writeFile(this.dbFilepath, textData, 'utf8');
  }

  getValueByPath(fullData, path) {
    const pathParts = splitPath(path);

    let currentData = fullData;
    for (const pathElement of pathParts) {
      if (!currentData[pathElement]) return null;

      currentData = currentData[pathElement];
    }

    return currentData;
  }

  async get(path) {
    const fullData = await this.readFile();

    return this.getValueByPath(fullData, path);
  }

  async exists(path) {
    const fullData = await this.readFile();

    return Boolean(this.getValueByPath(fullData, path));
  }

  async count(path) {
    const fullData = await this.readFile();
    const pathParts = splitPath(path);

    const val = this.getValueByPath(fullData, path);

    if (Array.isArray(val)) {
      return val.length;
    } else if (val == null) {
      return 0;
    } else {
      return 1;
    }
  }

  async push(path, data) {
    const fullData = await this.readFile();
    const pathParts = splitPath(path);

    let currentData = fullData;
    for (const [index, pathElement] of pathParts.entries()) {
      if (index + 1 === pathParts.length) {
        currentData[pathElement] = data;
      } else {
        if (!currentData[pathElement] && isNumeric(pathParts[index + 1])) {
          currentData[pathElement] = [];
        } else if (!currentData[pathElement]) {
          currentData[pathElement] = {};
        }
  
        currentData = currentData[pathElement];
      }
    }

    await this.writeFile(fullData);
  }

  async delete(path) {
    const fullData = await this.readFile();
    const pathParts = splitPath(path);

    let currentData = fullData;
    for (const [index, pathElement] of pathParts.entries()) {
      if (!currentData[pathElement]) return;

      if (index + 1 === pathParts.length) {
        delete currentData[pathElement];
      } else {
        currentData = currentData[pathElement];
      }
    }

    await this.writeFile(fullData);
  }
}

module.exports = { jsonDB };
