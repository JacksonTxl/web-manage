import { StRouteConfig } from '@/types'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { createRoutesFromStRoutes } from './generate'
import generatedRoutes from './generated-routes'
console.log(generatedRoutes)

const stRoutes: StRouteConfig[] = [

]

export const routes = createRoutesFromStRoutes(generatedRoutes)
