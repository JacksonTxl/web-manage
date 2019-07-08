<template>
  <span class='st-help-tooltip'>
    <a-tooltip
      :placement="placement"
      v-bind="$attrs"
      v-on="$listeners"
      @mouseenter="onMouseEnter"
    >
      <template slot="title">
        <span>{{tips}}</span>
      </template>
      <span><st-icon type="help"/></span><slot></slot>
    </a-tooltip>
  </span>
</template>
<script>
import { HelpTooltipService } from './help-tooltip.service'
export default {
  name: 'StHelpTooltip',
  serviceInject() {
    return {
      helpTooltipService: HelpTooltipService
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
      tips: '加载中...',
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
        this.tips = res.tips
        this.loaded = true
      })
    }
  }
}
</script>
