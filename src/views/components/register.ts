// global register components 全局注册的组件
import Vue from 'vue'
import StIcon from './icon/icon.vue'
import StButton from './button/button.vue'
import StCheckboxButtonGroup from './checkbox-button/checkbox-button-group.vue'
import StCheckboxButtonItem from './checkbox-button/checkbox-button-item.vue'
import StSteps from './steps/steps.vue'
import StStep from './steps/step.vue'
import StTable from './table/table.vue'
import StInputSearch from './input-search/input-search.vue'
import StAvatarUpload from './avatar-upload/avatar-upload.vue'
import StPictureUpload from './picture-upload/picture-upload.vue'
import StTree from './tree/tree.vue'
Vue.component(StIcon.name, StIcon)
Vue.component(StButton.name, StButton)
Vue.component(StSteps.name, StSteps)
Vue.component(StStep.name, StStep)
Vue.component(StTable.name, StTable)
Vue.component(StCheckboxButtonGroup.name, StCheckboxButtonGroup)
Vue.component(StCheckboxButtonItem.name, StCheckboxButtonItem)
Vue.component(StInputSearch.name, StInputSearch)
Vue.component(StAvatarUpload.name, StAvatarUpload)
Vue.component(StPictureUpload.name, StAvatarUpload)
Vue.component(StTree.name, StTree)
