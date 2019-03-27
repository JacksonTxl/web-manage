// global register components 全局注册的组件
import Vue from 'vue'
import StIcon from './st-icon.vue'
import StCheckboxButtonGroup from './checkbox-button/checkbox-button-group.vue'
import StCheckboxButtonItem from './checkbox-button/checkbox-button-item.vue'

Vue.component(StIcon.name, StIcon)
Vue.component(StCheckboxButtonGroup.name, StCheckboxButtonGroup)
Vue.component(StCheckboxButtonItem.name, StCheckboxButtonItem)
