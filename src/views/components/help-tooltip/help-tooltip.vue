<template>
  <span>
    <a-tooltip
      :placement="placement"
      v-bind="$attrs"
      v-on="$listeners">
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
      type: Number,
      default: 0
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      tips: '加载中...'
    }
  },
  created() {
    this.getHelp()
  },
  methods: {
    getHelp() {
      const { id } = this
      if (!id) {
        return
      }
      this.helpTooltipService.getToolTip(this.id).subscribe(res => {
        this.tips = res.tips
      })
    }
  }
}
</script>
