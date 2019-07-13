<template>
  <section class="sg-section">
    <h3>
      st-icon
      <a
        target="blank"
        href="https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1106512&keyword="
      >iconfont 链接</a>
    </h3>
    <st-container type="1">
      <li>
        <st-icon type="wechat"></st-icon>默认为父级容器字号
      </li>
      <li>
        <st-icon type="wechat" size="28px"></st-icon>使用[size]变更大小
      </li>
      <li>
        <st-icon type="wechat" color="red"></st-icon>使用[color]变更颜色
        <st-icon type='delete' color='blue'></st-icon> 删除
      </li>
      <li>
        <st-icon type="anticon:setting" color="red"></st-icon>使用[anticon:__] ant design自带的图标
      </li>
      <li>
        <st-button icon="wechat" type="primary">按钮中使用[icon]图标</st-button>
      </li>
    </st-container>
  </section>
</template>
