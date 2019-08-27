import { Container } from 'vue-service-app'
// @ts-ignore
import VueModalRouter from 'vue-modal-router'
import { modalRouter } from './modal-router'

/**
 * 依赖注入容器
 */
const appContainer = new Container()

appContainer.bindValue(VueModalRouter, modalRouter)

export default appContainer
