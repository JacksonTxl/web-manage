const isColor = require('is-color')
const _ = require('lodash')

const COLOR = {
  prop: 'color',
  test: val => isColor(val)
}
const BACKGROUND = {
  prop: 'background-color',
  test: val => isColor(val)
}

const BACKGROUND_COLOR = {
  prop: 'background-color',
  test: val => isColor(val)
}
const BORDER = {
  prop: 'border',
  test: val => isColor(_.last(val.split(' ')))
}
const BORDER_LEFT = {
  prop: 'border-left',
  test: val => isColor(_.last(val.split(' ')))
}
const BORDER_RIGHT = {
  prop: 'border-right',
  test: val => isColor(_.last(val.split(' ')))
}
const BORDER_TOP = {
  prop: 'border-top',
  test: val => isColor(_.last(val.split(' ')))
}
const BORDER_BOTTOM = {
  prop: 'border-bottom',
  test: val => isColor(_.last(val.split(' ')))
}

const BORDER_COLOR = {
  prop: 'border-color',
  test: val => isColor(val)
}
const BORDER_LEFT_COLOR = {
  prop: 'border-left-color',
  test: val => isColor(val)
}
const BORDER_RIGHT_COLOR = {
  prop: 'border-right-color',
  test: val => isColor(val)
}
const BORDER_TOP_COLOR = {
  prop: 'border-top-color',
  test: val => isColor(val)
}
const BORDER_BOTTOM_COLOR = {
  prop: 'border-bottom-color',
  test: val => isColor(val)
}
const TEXT_SHADOW = {
  prop: 'text-shadow',
  test: () => true
}
const BOX_SHADOW = {
  prop: 'box-shadow',
  test: () => true
}

module.exports = {
  color: [COLOR],
  background: [BACKGROUND, BACKGROUND_COLOR],
  'background-color': [BACKGROUND_COLOR, BACKGROUND],
  'box-shadow': [BOX_SHADOW],
  border: [
    BORDER,
    BORDER_LEFT,
    BORDER_RIGHT,
    BORDER_TOP,
    BORDER_BOTTOM,
    BORDER_COLOR,
    BORDER_LEFT_COLOR,
    BORDER_RIGHT_COLOR,
    BORDER_TOP_COLOR,
    BORDER_BOTTOM_COLOR
  ],
  'border-color': [
    BORDER,
    BORDER_LEFT,
    BORDER_RIGHT,
    BORDER_TOP,
    BORDER_BOTTOM,
    BORDER_COLOR,
    BORDER_LEFT_COLOR,
    BORDER_RIGHT_COLOR,
    BORDER_TOP_COLOR,
    BORDER_BOTTOM_COLOR
  ],
  'border-left': [BORDER, BORDER_COLOR, BORDER_LEFT, BORDER_LEFT_COLOR],
  'border-right': [BORDER, BORDER_COLOR, BORDER_RIGHT, BORDER_RIGHT_COLOR],
  'border-top': [BORDER, BORDER_COLOR, BORDER_TOP, BORDER_TOP_COLOR],
  'border-bottom': [BORDER, BORDER_COLOR, BORDER_BOTTOM, BORDER_BOTTOM_COLOR],
  'border-left-color': [BORDER, BORDER_COLOR, BORDER_LEFT, BORDER_LEFT_COLOR],
  'border-right-color': [
    BORDER,
    BORDER_COLOR,
    BORDER_RIGHT,
    BORDER_RIGHT_COLOR
  ],
  'border-top-color': [BORDER, BORDER_COLOR, BORDER_TOP, BORDER_TOP_COLOR],
  'border-bottom-color': [
    BORDER,
    BORDER_COLOR,
    BORDER_BOTTOM,
    BORDER_BOTTOM_COLOR
  ],
  'text-shadow': [TEXT_SHADOW]
}
