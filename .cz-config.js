module.exports = {
  types: [
    { value: 'fix', name: 'fix:      修复bug [ID]:描述' },
    { value: 'feat', name: 'feat:     提交一个特性' },
    {
      value: 'build',
      name: 'build: 变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等）'
    },
    { value: 'docs', name: 'docs:     文档修改' },
    {
      value: 'refactor',
      name: 'refactor: 代码重构 不设计修改bug和增加特性'
    },
    {
      value: 'style',
      name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）'
    },
    {
      value: 'perf',
      name: 'perf:     改善性能'
    },
    { value: 'test', name: 'test:     添加遗漏测试代码' },

    {
      value: 'chore',
      name: 'chore:    变更构建流程或辅助工具'
    },
    { value: 'revert', name: 'revert:   代码回退至具体的commit号' }
  ],

  scopes: ['all'],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "选择一种你的提交类型:",
    scope: '\n选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: '请填写自定scope说明 (可选):',
    subject: '短说明 (必填):\n',
    body:
      '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer:
      '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body', 'footer'],

  // limit subject length
  subjectLimit: 100
}
