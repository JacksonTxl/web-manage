<template>
  <div :class="b()">
    <a-input
      size="large"
      :class="b('input')"
      :placeholder="placeholder"
      @change="onChange"
      :value="value.phone"
    />
    <a-dropdown :class="b('dropdown')">
      <span class="cursor-pointer">
        +{{ value.phone_code }}
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
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    value: {
      type: Object
      // default: () => ({
      //   code_id: 37,
      //   phone_code: 86,
      //   phone: ''
      // })
    }
  },
  mounted() {
    this.inputPhoneService.getCountryCodes().subscribe()
  },
  methods: {
    onChange(event) {
      this.$emit('change', {
        phone: event.target.value,
        code_id: this.value.code_id,
        phone_code: this.value.phone_code
      })
    },
    onClickItem(event) {
      this.$emit('change', {
        phone: this.value.phone,
        phone_code: event.phone_code,
        code_id: event.code_id
      })
    }
  }
}
</script>
