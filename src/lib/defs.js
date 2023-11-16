export const WIDTH = 4
export const HEIGHT = 5
export const CUBE_SIZE = 128

export const CAOCAO = '曹操'
export const GUANYU = '关羽'
export const ZHANGFEI = '张飞'
export const ZHAOYUN = '赵云'
export const MACHAO = '马超'
export const HUANGZHONG = '黄忠'
export const BING = '兵'

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
    [2, 2, 1, 0, CAOCAO],
    [1, 2, 0, 0, ZHAOYUN],
    [1, 2, 3, 0, MACHAO],
    [1, 2, 0, 2, HUANGZHONG],
    [1, 2, 3, 2, ZHANGFEI],
    [2, 1, 1, 2, GUANYU],
    [1, 1, 1, 3, BING],
    [1, 1, 2, 3, BING],
    [1, 1, 0, 4, BING],
    [1, 1, 3, 4, BING],
  ]

  return layout.map(([w, h, x, y, hero]) => ({
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
    if (srcItem.hero != targetItem.hero && collised(srcItem, targetItem)) {
      return true
    }
  }
  return false
}