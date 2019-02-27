class Map {
  map = {}
  set(key, handlers) {
    this.map[key] = handlers
  }
  get(key) {
    return this.map[key]
  }
}

export const routeGuardsMap = new Map()
export const routeQueryOptionsMap = new Map()
