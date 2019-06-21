/**
 * 深度遍历树结构
 */
export const walkTree = (tree, fn) => {
  const walk = (nodes, depth = 0) => {
    if (Array.isArray(nodes)) {
      nodes.forEach(node => {
        const hasChildren = node.children && node.children.length
        fn(node, {
          depth,
          isLeaf: !hasChildren,
          isTop: depth === 0
        })
        if (hasChildren) {
          walk(node.children, depth + 1)
        }
      })
    }
  }
  walk(tree)
}
