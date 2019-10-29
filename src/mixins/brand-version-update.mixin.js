import { UserService } from '@/services/user.service'
export default {
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      isBrandStudio: this.userService.isBrandStudio$
    }
  },
  data() {
    return {
      brandUpdateMid: 0
    }
  },
  methods: {
    closeModal() {},
    showVersionUpdate() {
      if (this.isBrandStudio) {
        this.brandUpdateMid = this.$modalRouter.push({
          name: 'brand-version-update'
        })
      }
    }
  },
  mounted() {
    this.showVersionUpdate()
  },
  beforeDestory() {
    console.log(this.brandUpdateMid)
    this.$modalRouter.close(this.brandUpdateMid)
  }
}
