<template>
  <span class='st-help-tooltip'>
    <a-tooltip
      v-if="invalidTooltips.indexOf(id) === -1"
      :placement="placement"
      v-bind="$attrs"
      v-on="$listeners"
      @mouseenter="onMouseEnter"
    >
      <template slot="title">
        <span>{{content}}</span>
      </template>
      <span><st-icon type="help"/></span><slot></slot>
    </a-tooltip>
  </span>
</template>
<script>
import { UserService } from '@/services/user.service'
import { HelpTooltipService } from './help-tooltip.service'
export default {
  name: 'StHelpTooltip',
  serviceInject() {
    return {
      userService: UserService,
      helpTooltipService: HelpTooltipService
    }
  },
  rxState() {
    return {
      invalidTooltips: this.userService.invalidTooltips$,
      menuData: this.userService.menuData$
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      content: '加载中...',
      loaded: false
    }
  },
  methods: {
    onMouseEnter() {
      if (!this.loaded) {
        this.getHelp()
      }
    },
    getHelp() {
      const { id } = this
      this.helpTooltipService.getToolTip(this.id).subscribe(res => {
        this.content = res.info.content
        this.loaded = true
      })
    }
  }
}
</script>
