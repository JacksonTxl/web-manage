<template>
  <div :class="bSourceMode()">
    <title-info v-model="titleData"></title-info>
    <span class="mg-r16">选择来源</span>
    <div v-if="value.getData.source_channel.length">
      <template v-for="(tag, index) in value.getData.source_channel">
        <a-tooltip :key="index" :title="tag.name">
          <a-tag
            :key="index"
            :closable="true"
            :afterClose="() => handleClose(tag, index)"
          >
            {{ tag.name }}
          </a-tag>
        </a-tooltip>
      </template>
    </div>

    <a-tag :class="bSourceMode('tag')">
      <a-dropdown>
        <a class="ant-dropdown-link">
          <a-icon type="plus" />
          添加
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item, key, index) in sourceOptions" :key="index">
            <a @click="dropdownFunc(item, index)">{{ item.name }}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tag>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import titleInfo from './title-info.vue'
import { cloneDeep } from 'lodash-es'
export default {
  bem: {
    bSourceMode: 'crowd-components-source-mode'
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      crowdEnums: this.userService.crowdEnums$
    }
  },
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  components: {
    titleInfo
  },
  data() {
    return {
      titleData: {
        title: '来源方式',
        info: '选择来源方式为以下范围的用户'
      },
      sourceOptions: []
    }
  },
  created() {
    let list = []
    if (!this.crowdEnums.crowd_source_channel) return list
    Object.entries(this.crowdEnums.crowd_source_channel.value).forEach(o => {
      list.push({ value: +o[0], name: o[1] })
    })
    this.sourceOptions = list
    if (this.value.getData.source_channel.length > 0) {
      this.tags = cloneDeep(this.value.getData.source_channel)
    }
  },
  methods: {
    dropdownFunc(item, index) {
      const arr = this.tags.filter(i => {
        return i.value === item.value
      })
      if (arr.length > 0) {
        return
      }
      this.value.getData.source_channel.push(item)
      this.tags.push(item)
    },

    onChange(date, dateString) {
      this.$emit('dataChangge', this.value)
    },
    handleClose(removedTag, index) {
      this.value.getData.source_channel.forEach((element, i) => {
        if (element.value === item.value) {
          this.value.getData.source_channel.splice(i, 1)
        }
      })
    }
  }
}
</script>
