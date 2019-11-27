import { merge } from 'lodash-es'

export class Tree {
  constructor(tree = [], options = {}) {
    this.tree = tree
    this.options = merge(
      {
        id: 'id',
        children: 'children'
      },
      options
    )
  }
  _id(node) {
    return node[this.options.id]
  }
  _children(node) {
    return node[this.options.children]
  }
  _toMap() {
    const map = {}
    const walk = (tree, parent) => {
      tree.forEach(node => {
        node._extra = {
          parent
        }
        // 新的不会覆盖老的
        if (!map[this._id(node)]) {
          map[this._id(node)] = node
        }
        if (this._children(node) && this._children(node).length) {
          walk(this._children(node), node)
        }
      })
    }
    walk(this.tree)
    return map
  }
  findById(id) {
    const map = this._toMap()
    console.log(Object.create(map[id]))

    return map[id]
  }
}
