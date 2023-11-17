export const WIDTH = 4
export const HEIGHT = 5
export const CUBE_SIZE = 128

export const CAOCAO = '曹操'
export const GUANYU = '关羽'
export const ZHANGFEI = '张飞'
export const ZHAOYUN = '赵云'
export const MACHAO = '马超'
export const HUANGZHONG = '黄忠'
export const BINGZU = '卒'

export function blockBgColor(hero) {
  let bgColor = 'bg-green-400'
  switch (hero) {
    case CAOCAO:
      bgColor = 'bg-blue-400'
      break

    case GUANYU:
      bgColor = 'bg-red-400'
      break

    case ZHANGFEI:
      bgColor = 'bg-gray-600'
      break

    case HUANGZHONG:
      bgColor = 'bg-yellow-400'
      break

    case ZHAOYUN:
      bgColor = 'bg-orange-400'
      break

    case MACHAO:
      bgColor = 'bg-sky-400'
      break
  }
  return bgColor
}

export function layoutHendaolima() {
  const layout = [
    ['caocao', 2, 2, 1, 0, CAOCAO],
    ['huangzhong', 1, 2, 0, 0, HUANGZHONG],
    ['zhaoyun', 1, 2, 3, 0, ZHAOYUN],
    ['machao', 1, 2, 0, 2, MACHAO],
    ['zhangfei', 1, 2, 3, 2, ZHANGFEI],
    ['guanyu', 2, 1, 1, 2, GUANYU],
    ['bing1', 1, 1, 0, 4, `${BINGZU}1`],
    ['bing2', 1, 1, 1, 3, `${BINGZU}2`],
    ['bing3', 1, 1, 2, 3, `${BINGZU}3`],
    ['bing4', 1, 1, 3, 4, `${BINGZU}4`],
  ]

  return layout.map(([id, w, h, x, y, hero]) => ({
    id,
    w,
    h,
    x,
    y,
    hero,
  }))
}

function itemCubes({ w, h, x, y }) {
  const cubes = []
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      cubes.push([x + i, y + j])
    }
  }
  return cubes
}

function collised(srcItem, targetItem) {
  const srcCubes = itemCubes(srcItem)
  const targetCubes = itemCubes(targetItem)
  for (let [sx, sy] of srcCubes) {
    for (let [tx, ty] of targetCubes) {
      if (sx == tx && sy == ty) {
        return true
      }
    }
  }
  return false
}

export function detectCollision(srcItem, blocks) {
  for (const targetItem of blocks) {
    if (srcItem.id != targetItem.id && collised(srcItem, targetItem)) {
      return true
    }
  }
  return false
}