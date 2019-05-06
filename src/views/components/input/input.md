## API
### input-number
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model   | 双向绑定的值| array| []  |
| float   | 是否支持小数| boolean| []  |
### input-number  event
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| change   | 参数为输入的值| function|   |

> 此input只能输入12位。仅支持addonAfter插槽（不支持属性形式）。同时为了允许输入'\.',所以返回值为string类型。此input组件适用输入date  price表单。