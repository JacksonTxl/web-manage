// global register components 全局注册的组件
import Vue from 'vue'
import StIcon from './icon/icon.vue'
import StButton from './button/button.vue'
import StCheckboxButtonGroup from './checkbox-button/checkbox-button-group.vue'
import StCheckboxButtonItem from './checkbox-button/checkbox-button-item.vue'
import StRadioButtonGroup from './radio-button/radio-button-group.vue'
import StRadioButtonItem from './radio-button/radio-button-item.vue'
import StCheckboxFacilityGroup from './checkbox-facility/checkbox-facility-group.vue'
import StCheckboxFacilityItem from './checkbox-facility/checkbox-facility-item.vue'
import StTable from './table/table.vue'
import StInputSearch from './input-search/input-search.vue'
import StAvatarUpload from './avatar-upload/avatar-upload.vue'
import StTree from './tree/tree.vue'
import StInfo from './info/info.vue'
import StInfoItem from './info/info-item.vue'
import StRouteTabs from './route-tabs/route-tabs.vue'
import StHr from './hr/hr.vue'
import StTag from './tag/tag.vue'
import StPanel from './panel/panel.vue'
import StSlider from './slider/slider.vue'
import stShopHourPicker from './slider/stShopHourPicker.vue'
import StRegionCascader from './region/region-cascader.vue'
import StSteps from './steps/steps.vue'
import StMoreDropdown from './more-dropdown/more-dropdown.vue'
import StHelpPopover from './help-popover/help-popover.vue'
import StCardHourPicker from './card-hour-picker/card-hour-picker.vue'
import FileUpload from './file-upload/file-upload.vue'
import './form/index.js'
import './title/index.js'

Vue.component(StRegionCascader.name, StRegionCascader)
Vue.component(StIcon.name, StIcon)
Vue.component(StButton.name, StButton)
Vue.component(StTable.name, StTable)
Vue.component(StCheckboxButtonGroup.name, StCheckboxButtonGroup)
Vue.component(StCheckboxButtonItem.name, StCheckboxButtonItem)
Vue.component(StRadioButtonGroup.name, StRadioButtonGroup)
Vue.component(StRadioButtonItem.name, StRadioButtonItem)
Vue.component(StCheckboxFacilityGroup.name, StCheckboxFacilityGroup)
Vue.component(StCheckboxFacilityItem.name, StCheckboxFacilityItem)
Vue.component(StInputSearch.name, StInputSearch)
Vue.component(StAvatarUpload.name, StAvatarUpload)
Vue.component(StTree.name, StTree)
Vue.component(StInfo.name, StInfo)
Vue.component(StInfoItem.name, StInfoItem)
Vue.component(StRouteTabs.name, StRouteTabs)
Vue.component(StHr.name, StHr)
Vue.component(StTag.name, StTag)
Vue.component(StPanel.name, StPanel)
Vue.component(StSlider.name, StSlider)
Vue.component(stShopHourPicker.name, stShopHourPicker)
Vue.component(StSteps.name, StSteps)
Vue.component(StMoreDropdown.name, StMoreDropdown)
Vue.component(StHelpPopover.name, StHelpPopover)
Vue.component(StCardHourPicker.name, StCardHourPicker)
Vue.component(FileUpload.name, FileUpload)
