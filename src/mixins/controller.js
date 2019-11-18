import container from '@/container'
import { createController } from 'vue-service-app'
export default Ctrl => {
  return createController(Ctrl, container)
}
