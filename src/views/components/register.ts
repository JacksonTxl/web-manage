// global register components 全局注册的组件
import Vue from 'vue'
import StIcon from './icon/icon.vue'
import StButton from './button/button.vue'
import StSteps from './steps/steps.vue'
import StStep from './steps/step.vue'
import StTable from './table/table.vue'
import StCheckboxButtonGroup from './st-checkbox-button-group.vue'
import StCheckboxButtonItem from './st-checkbox-button-item.vue'

Vue.component(StIcon.name, StIcon)
Vue.component(StButton.name, StButton)
Vue.component(StSteps.name, StSteps)
Vue.component(StStep.name, StStep)
Vue.component(StTable.name, StTable)

Vue.component(StIcon.name, StIcon)
Vue.component(StCheckboxButtonGroup.name, StCheckboxButtonGroup)
Vue.component(StCheckboxButtonItem.name, StCheckboxButtonItem)
