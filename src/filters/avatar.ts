import { imgFilter } from './img'
import avatarDefault from '@/assets/img/avatar_default.png'

export const avatarFilter = (key: string, options = {}) => {
  return key ? imgFilter(key, options) : avatarDefault
}
