# config 配置
这里配置的是全局编译运行时的常量。比如环境变量，apiBaseUrl等。常用于[Service](/saas/service.md),通过Injectable注入。而编译时的常量是通过vue.config.js引用的。
## 使用示例
```js {1,8,10}
import { AppConfig } from '@/constants/config'

/**
 * token验证
 */
@Injectable()
export class AuthService {
  constructor(private router: ServiceRouter, private appConfig: AppConfig) {}
  getAuthToken() {
    return Cookie.get(this.appConfig.TOKEN_NAME)
  }
}

```