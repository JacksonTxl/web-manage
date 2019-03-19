const Fse = require('fs-extra')
const Path = require('path')

const ImportReg = /@import (.+);\n*/g
const DeclReg = /([@A-Za-z-0-9]+)\s*:\s*(.+);/g
const FunctionReg = /@functions: ~`/
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
  load() {
    this.source = Fse.readFileSync(this.path, {
      encoding: this.encoding
    })
  }
  get ext() {
    return Path.extname(this.name)
  }
  get sourcePreprocess() {
    return this.source
  }
  get content() {
    return this.sourcePreprocess.replace(ImportReg, (_, depName) => {
      depName = depName.replace(/('|")/g, '')
      const depFile = new LessFile({ name: depName, parent: this })

      // 已经读取过 不需要再引入了
      if (this.resourceCache.get(depFile.path)) {
        return ''
      }
      // css  文件不需要引入
      if (depFile.ext === '.css') {
        return ''
      }

      this.resourceCache.set(depFile.path, true)
      return this.deps.get(depName).content
    })
  }
  process() {
    this.load()
    this.sourcePreprocess.replace(ImportReg, (_, depName) => {
      depName = depName.replace(/('|")/g, '')
      const dep = this.addDep({ name: depName })
      dep.process()
    })
    return this
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
