import { Route } from 'vue-router'

class QueryService {
  beforeEach(to: Route, from: Route, next: any) {
    const queryOptions = to.meta.queryOptions
    const formatedQuery = Object.assign({}, to.query)
    if (queryOptions) {
      for (let queryName in queryOptions) {
        const query = queryOptions[queryName]
        const queryType = query.type
        const queryDefaultValue = query.default
        if (queryName in to.query) {
          formatedQuery[queryName] = queryType(to.query[queryName])
        } else {
          formatedQuery[queryName] = queryDefaultValue
        }
      }
    }
    to.meta.query = formatedQuery
    next()
  }
}

export const queryService = new QueryService()
