import VueRouter, {
  Route as VueRoute,
  RouteConfig as VueRouteConfig,
  Location
} from 'vue-router'
import { VueConstructor } from 'vue'
import Vue from 'vue'

type PluginFunction<T> = (Vue: VueConstructor, options?: T) => void

interface Dictionary<T> {
  [key: string]: T
}

interface Ctor<T> {
  new (...args: any[]): T
}

interface MyLocation extends Location {
  /**
   * 强制更新replaceState当前页，即使没有任何query更新
   */
  force?: Boolean
  query?: Dictionary<any>
}

interface QueryOption {
  default?: number | string
  type: NumberConstructor | StringConstructor
}

interface QueryOptions {
  [queryName: string]: QueryOption
}

interface RouteConfigMeta {
  [key: string]: any
  queryOptions?: QueryOptions
}

// 全局声明类型 declares
export interface ServiceRoute extends VueRoute {
  name: string
  meta: {
    [key: string]: any
    query: any
  }
}

export interface ServiceRouteConfig extends VueRouteConfig {
  guards?: any[] | never[]
  queryOptions?: QueryOptions
  children?: ServiceRouteConfig[]
  meta?: RouteConfigMeta
}

type ServiceProvideConfig =
  | Ctor<any>
  | {
      provide: any
      useValue?: any
      useClass?: Ctor<any>
    }

export interface RouteGuard {
  beforeEach?(to: ServiceRoute, from: ServiceRoute, next: Function): void
  beforeRouteEnter?(to: ServiceRoute, from: ServiceRoute, next: Function): void
  beforeRouteUpdate?(to: ServiceRoute, from: ServiceRoute, next: Function): void
  afterEach?(to: ServiceRoute, from: ServiceRoute, next: Function): void
}
export interface OnInit {
  onInit?(next: Function): void
}

export class Container {
  get<T>(provide: Ctor<T>): T
  get(provide: any): any
  useClass(Cls: any): this
  useValue(provide: any, value: any): this
}

interface VueServiceAppConfig {
  base?: string
  routes?: ServiceRouteConfig[]
  onInit?: Function[]
  providers?: ServiceProvideConfig[]
}

declare module 'vue-service-app' {
  export class ServiceRouter extends VueRouter {
    push(
      location: string | MyLocation,
      onComplete?: Function,
      onAbort?: (err: Error) => void
    ): void
  }
  export class InjectionToken {
    constructor(desc: string)
  }
  export function Injectable(): any
  export function Inject(provide: any): any
  export default class VueServiceApp {
    static install: PluginFunction<never>
    constructor(config: VueServiceAppConfig)
    router: ServiceRouter
  }
}

declare global {
  interface Window {
    getContainer(): Container
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    /**
     * injects
     */
    serviceInject?: (this: V) => object
  }
}
