<template>
  <div :class="b()">
    <a-input
      size="large"
      :class="b('input')"
      :placeholder="placeholder"
      @change="onChange"
    />
    <a-dropdown :class="b('dropdown')">
      <span class="cursor-pointer">
        +{{ countryName }}
        <a-icon type="down" />
      </span>
      <a-menu slot="overlay">
        <a-menu-item
          v-for="(item, index) in countryList"
          :key="index"
          :value="item.code_id"
          @click="onClickItem(item)"
        >
          <a>+{{ item.phone_code }}</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
import { InputPhoneService } from './input-phone.service'
export default {
  name: 'InputPhone',
  bem: {
    b: 'input-phone'
  },
  serviceInject() {
    return {
      inputPhoneService: InputPhoneService
    }
  },
  rxState() {
    return {
      countryList: this.inputPhoneService.countryList$
    }
  },
  props: {
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        this.init(newVal)
      }
    }
  },
  created() {
    this.inputPhoneService.getCountryCodes().subscribe()
    // this.init(this.value)
  },
  data() {
    return {
      number: '',
      countryName: 86,
      countryId: 37
    }
  },
  methods: {
    init(data) {
      this.number = data
    },
    onChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    },
    onClickItem(event) {
      this.countryName = event.phone_code
    }
  }
}
</script>
