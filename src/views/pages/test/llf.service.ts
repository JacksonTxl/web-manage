import { SearchService } from '@/services/search.service'

interface LlfSearchQuery {
  a: number
  b: number
}

export class LlfService extends SearchService<LlfSearchQuery> {}
