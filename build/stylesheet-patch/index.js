const cssom = require('cssom')
const _ = require('lodash')
const DECL_MAP = require('./stylesheet-patch-map')

const STYLE_RULE_TYPE = 1
const MEDIA_RULE_TYPE = 5
const OTHER_RULE_TYPE = 10

class StylesheetPatch {
  constructor({ excludeSelectors = [] } = {}) {
    this.aSource = ''
    this.bSource = ''
    this.aRules = null
    this.bRules = null
    this.allChangedProps = new Set()
    this.addedDecls = []
    this.excludeSelectors = excludeSelectors
  }
  _loadRules() {
    this.aRules = cssom.parse(this.aSource).cssRules
    this.bRules = cssom.parse(this.bSource).cssRules
  }
  _generateChangedProps() {
    _.forEach(this.bRules, (bRule, ruleIndex) => {
      const aRule = this.aRules[ruleIndex]
      if (aRule) {
        const aExpr = this._getExprByRule(aRule)
        const bExpr = this._getExprByRule(bRule)
        // 同样的css样式
        if (aExpr.cssText === bExpr.cssText) {
          return
        }
        // 同样的声明
        if (
          aExpr.selectorText === bExpr.selectorText &&
          aExpr.type === bExpr.type
        ) {
          const diffDecls = this._getDifferenceDecls(aExpr.decls, bExpr.decls)
          if (diffDecls.length) {
            diffDecls.forEach(decl => {
              this.allChangedProps.add(decl.prop)
            })
          }
        }
        // added in bSource
      } else {
        const bExpr = this._getExprByRule(bRule)
        if (bExpr.type === MEDIA_RULE_TYPE) {
          return
        }
        if (bExpr.type === STYLE_RULE_TYPE) {
          this.addedDecls.push({
            selectorText: bExpr.selectorText,
            cssText: bExpr.cssText
          })
        }
        // MediaType 暂时不处理
        if (bExpr.type === MEDIA_RULE_TYPE) {
          // return
        }
      }
    })
  }
  get allEffectedPropDecls() {
    const res = []
    this.allChangedProps.forEach(propName => {
      if (!DECL_MAP[propName]) {
        throw new Error(`prop ${propName} is not support yet!`)
      }
      const propTestRules = DECL_MAP[propName]

      propTestRules.forEach(propTestRule => {
        if (!_.find(res, { prop: propTestRule.prop })) {
          res.push(propTestRule)
        }
      })
    })
    return res
  }

  /**
   *  generate Decls map by CssStyleRule.style object
   */
  _getDeclsByRuleStyle(style) {
    const decls = []
    for (let i = 0; i < style.length; i++) {
      const prop = style[i]
      decls.push({
        prop,
        value: style[prop]
      })
    }
    return decls
  }
  _getExprByRule(rule) {
    if (!rule) {
      return
    }
    if (rule.style) {
      const decls = this._getDeclsByRuleStyle(rule.style)
      return {
        type: STYLE_RULE_TYPE,
        selectorText: rule.selectorText,
        decls: decls,
        cssText: rule.cssText
      }
    }
    if (rule.media) {
      // css import rule ignore here
      if (rule.href) {
        return {
          type: OTHER_RULE_TYPE,
          decls: [],
          cssText: rule.cssText
        }
      }
      const decls = rule.cssRules.map(rule => this._getExprByRule(rule))
      return {
        type: MEDIA_RULE_TYPE,
        mediaText: rule.media.mediaText,
        decls,
        cssText: rule.cssText
      }
    }
    // 现不支持处理keyframes的规则变更
    return {
      type: OTHER_RULE_TYPE,
      decls: [],
      cssText: rule.cssText
    }
  }
  /**
   * 求出声明规则的差集
   *
   */

  _getDifferenceDecls(a, b) {
    return _.differenceWith(b, a, _.isEqual)
  }
  process(aSource, bSource) {
    this.aSource = aSource
    this.bSource = bSource
    this.aRules = null
    this.bRules = null
    this.addedDecls = []
    this.allChangedProps = new Set()
    this._loadRules()
    this._generateChangedProps()

    const cssReultArray = []

    _.forEach(this.bRules, bRule => {
      const bExpr = this._getExprByRule(bRule)
      if (bExpr.type === STYLE_RULE_TYPE) {
        if (this.excludeSelectors.some(reg => reg.test(bExpr.selectorText))) {
          return
        }
        const decls = bExpr.decls
        const neededDecls = decls.filter(decl => {
          const finded = _.find(this.allEffectedPropDecls, { prop: decl.prop })
          if (!finded) {
            return
          }
          return finded.test(decl.value)
        })
        if (neededDecls.length) {
          cssReultArray.push({
            selectorText: bExpr.selectorText,
            decls: neededDecls,
            cssText: `${bExpr.selectorText}{${neededDecls
              .map(decl => decl.prop + ':' + decl.value + ';')
              .join('')}}`
          })
        }
      }
      if (bExpr.type === MEDIA_RULE_TYPE) {
      }
    })
    const changedCssResult = cssReultArray.map(item => item.cssText).join('\n')
    const addedCssResult = this.addedDecls.map(item => item.cssText).join('\n')
    return {
      css: changedCssResult + '\n' + addedCssResult
    }
  }
}

module.exports = StylesheetPatch
