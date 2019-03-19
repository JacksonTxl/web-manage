import { SearchService } from '@/services/search.service'

interface SearchQuery {
  a: number
  b: number
}

export class LlfService extends SearchService<SearchQuery> {}
