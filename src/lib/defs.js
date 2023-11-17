const CAOCAO = 'caocao'
const HUANGZHONG = 'huangzhong'
const ZHAOYUN = 'zhaoyun'
const MACHAO = 'machao'
const ZHANGFEI = 'zhangfei'
const GUANYU = 'guanyu'
const BINGZU1 = 'bingzu1'
const BINGZU2 = 'bingzu2'
const BINGZU3 = 'bingzu3'
const BINGZU4 = 'bingzu4'

const hengdaolima = [
  [CAOCAO, 2, 2, 1, 0, '曹操'],
  [HUANGZHONG, 1, 2, 0, 0, '黄忠'],
  [ZHAOYUN, 1, 2, 3, 0, '赵云'],
  [MACHAO, 1, 2, 0, 2, '马超'],
  [ZHANGFEI, 1, 2, 3, 2, '张飞'],
  [GUANYU, 2, 1, 1, 2, '关羽'],
  [BINGZU1, 1, 1, 0, 4, '卒1'],
  [BINGZU2, 1, 1, 1, 3, '卒2'],
  [BINGZU3, 1, 1, 2, 3, '卒3'],
  [BINGZU4, 1, 1, 3, 4, '卒4'],
]

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

export const Defs = {
  WIDTH: 4,
  HEIGHT: 5,
  CUBE_SIZE: 128,
  CUBE_SIZE_SM: 64,

  blockBgColor(id) {
    let bgColor = 'bg-green-400'
    switch (id) {
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
  },

  layoutHendaolima() {
    return hengdaolima.map(([id, w, h, x, y, hero]) => ({
      id,
      w,
      h,
      x,
      y,
      hero,
    }))
  },

  detectCollision(srcItem, blocks) {
    for (const targetItem of blocks) {
      if (srcItem.id != targetItem.id && collised(srcItem, targetItem)) {
        return true
      }
    }
    return false
  }
}