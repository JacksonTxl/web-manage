<template>
  <span>
    <a-tooltip
      :placement="placement"
      v-bind="$attrs"
      v-on="$listeners">
      <template slot="title">
        <span>{{info}}</span>
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
      info: ''
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
      this.helpTooltipService.getHelp(this.id).subscribe(res => {
        this.info = res.info
      })
    }
  }
}
</script>
