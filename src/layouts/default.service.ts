import { getCurrentUserInfo } from '@/api/user'
import { useState } from '@/lib/rx-hooks'
import { http } from '@/services/http.service'

class DefaultService {
  namespace = 'DefaultBusiness'
}

export const defaultBusiness = new DefaultService()
