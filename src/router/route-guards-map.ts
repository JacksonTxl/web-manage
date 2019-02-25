class RouteGuardsMap {
  map: any = {}
  set(key: string, handlers: any) {
    this.map[key] = handlers
  }
  get(key: string) {
    return this.map[key]
  }
}

export const routeGuardsMap = new RouteGuardsMap()
