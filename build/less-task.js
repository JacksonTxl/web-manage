const Fse = require('fs-extra')
const Path = require('path')

const ImportReg = /@import (.+);\n*/g

class LessFile {
  constructor({ name = '', parent = null, resourceCache = null } = {}) {
    this.encoding = 'utf-8'
    this.name =
      name.includes('.less') || name.includes('.css') ? name : name + '.less'
    this.parent = parent
    this.source = ''
    this.deps = new Map()
    this.resourceCache = resourceCache
  }
  get path() {
    if (this.parent) {
      return Path.isAbsolute(this.name)
        ? this.name
        : Path.join(this.parent.dir, this.name)
    } else {
      return Path.resolve(this.name)
    }
  }
  get dir() {
    return Path.dirname(this.path)
  }
  process() {
    this.source = Fse.readFileSync(this.path, {
      encoding: this.encoding
    })
    this.source.replace(ImportReg, (_, depName) => {
      depName = depName.replace(/('|")/g, '')
      const dep = this.addDep({ name: depName })
      dep.process()
    })
    return this
  }
  get content() {
    return this.source.replace(ImportReg, (_, depName) => {
      depName = depName.replace(/('|")/g, '')
      const lessFile = new LessFile({ name: depName, parent: this })
      const lessFilePath = lessFile.path
      // 已经读取过
      if (this.resourceCache.get(lessFilePath)) {
        return ''
      } else {
        this.resourceCache.set(lessFilePath, true)
        return this.deps.get(depName).content
      }
    })
  }
  addDep({ name }) {
    const dep = new LessFile({
      name,
      parent: this,
      resourceCache: this.resourceCache
    })
    this.deps.set(name, dep)
    return dep
  }
}

class LessTask {
  run(inputPath = '') {
    if (!inputPath) {
      throw new Error('should pass inputLessPath')
    }
    const less = new LessFile({
      name: inputPath,
      resourceCache: new Map()
    }).process()
    return less
  }
}

module.exports = LessTask
