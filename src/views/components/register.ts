// global register components 全局注册的组件
import Vue from 'vue'
import StCheckboxButtonGroup from './checkbox-button/checkbox-button-group.vue'
import StCheckboxButtonItem from './checkbox-button/checkbox-button-item.vue'
import StIcon from './icon.vue'
import StButton from './button.vue'
import StSteps from './steps/steps.vue'
import StStep from './steps/step.vue'
import StTable from './table/table.vue'
Vue.component(StIcon.name, StIcon)
Vue.component(StButton.name, StButton)
Vue.component(StSteps.name, StSteps)
Vue.component(StStep.name, StStep)
Vue.component(StTable.name, StStep)

Vue.component(StIcon.name, StIcon)
Vue.component(StCheckboxButtonGroup.name, StCheckboxButtonGroup)
Vue.component(StCheckboxButtonItem.name, StCheckboxButtonItem)
