import { merge, omit } from 'lodash-es'
class TreeNode {
  constructor(data, options = {}) {
    this.data = omit(data, [options.children])
    this.id = data[options.id]
    this.name = data[options.name]
    this.parent = null
    this.children = []
  }
  setParent(parentNode) {
    this.parent = parentNode
  }
}
export class Tree {
  constructor(treeData = [], options = {}) {
    this.options = merge(
      {
        id: 'id',
        children: 'children',
        name: 'name'
      },
      options
    )
    this._treeData = treeData
    this._tree = []
    this._init()
  }
  _init() {
    this._tree = []
    const walk = (tree, parentTreeNode = null, childrenInsert = []) => {
      tree.forEach(data => {
        const treeNode = new TreeNode(data, this.options)
        treeNode.setParent(parentTreeNode)
        childrenInsert.push(treeNode)

        if (data.children && data.children.length) {
          walk(data.children, treeNode, treeNode.children)
        }
      })
    }
    walk(this._treeData, null, this._tree)
    console.log(this._tree)
  }
  findNodeById(id) {
    let find = undefined
    const walk = tree => {
      tree.forEach(node => {
        if (node.id === id) {
          find = node
        }
        if (!find && node.children && node.children.length) {
          walk(node.children)
        }
      })
    }
    walk(this._tree)
    return find
  }
}
