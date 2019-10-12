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
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    countryDetail: Object
  },
  watch: {
    countryDetail: {
      deep: true,
      handler(newVal) {
        if (newVal && newVal.phone_code) {
          this.countryId = newVal.code_id
          this.countryName = newVal.phone_code
          this.onClickItem({
            code_id: this.countryId,
            phone_code: this.countryName
          })
        }
      }
    }
  },
  mounted() {
    this.inputPhoneService.getCountryCodes().subscribe()
    if (this.countryDetail && this.countryDetail.phone_code) {
      this.countryId = this.countryDetail.code_id
      this.countryName = this.countryDetail.phone_code
    }
    this.onClickItem({ code_id: this.countryId, phone_code: this.countryName })
  },
  data() {
    return {
      countryName: 86,
      countryId: 37
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    },
    onClickItem(event) {
      this.countryName = event.phone_code
      this.$emit('select', event)
    }
  }
}
</script>
