<template>
    <div :class="inviation()">
        <st-form>
            <st-form-item label="功能开关" required>
                <a-switch defaultChecked />
                <span>已开启</span>
                <span>（一旦开启，将会在用户端展示，如需关闭，请谨慎操作。）</span>
            </st-form-item>
            <st-form-item label="成功规则">
                每邀请1人成功购买卡项或课程（成功支付）
            </st-form-item>
            <st-form-item label="邀请人奖励" required>
                <div :class="inviation('coupon')">
                    <span class="mg-r8">可获得</span>
                    <st-input-number style="width:142px">
                        <span slot="addonAfter">张</span>
                    </st-input-number>
                    <span class="mg-l24">选择券</span>
                    <st-coupon class="mg-l8 mg-r8" name="新人券" />
                    <st-button icon="anticon:plus">重新选择</st-button>
                </div>
            </st-form-item>
            <st-form-item label="被邀请人奖励" required>
                <div :class="inviation('coupon')">
                    <span class="mg-r8">可获得</span>
                    <st-input-number style="width:142px">
                        <span slot="addonAfter">张</span>
                    </st-input-number>
                    <span class="mg-l24">选择券</span>
                    <st-coupon class="mg-l8 mg-r8" name="新人券" />
                    <st-button icon="anticon:plus">重新选择</st-button>
                </div>
            </st-form-item>
            <st-form-item label=" 邀请海报">
                 邀请海报
            </st-form-item>
            <st-form-item label=" ">
                <st-button type="primary">保存</st-button>
            </st-form-item>
        </st-form>
    </div>
</template>
<script>
export default {
  name: 'PageBrandMarketingInviationSetting',
  bem: {
    inviation: 'page-brand-marketing-inviation-setting'
  }

}
</script>
