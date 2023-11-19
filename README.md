# 基于 React、Nextjs、React-DnD 和 TailwindCss 实现经典三国华容道小游戏

![hendaolima](https://cdn.huoyijie.cn/uploads/2023/11/huarongdao-hendaolima.png)

![qrcode](https://cdn.huoyijie.cn/uploads/2023/11/huarongdao-qrcode.png)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## Github

[代码地址](https://github.com/huoyijie/huarongdao)

[在线试玩](https://huoyijie.github.io/huarongdao/)

## 实现思路

华容道游戏最重要的部分就是华容道地图和角色拼块：

```bash
     0 1 2 3
   +---------+
 0 | * O O * |
 1 | * O O * |
 2 | * * * * |
 3 | * * * * |
 4 | * * * * |
   +---------+
```

上面是华容道地图，由 4 x 5 共计 20 个方格组成，曹操占据 4 个方格，关羽占据横向 2 个方格，其他五虎将占据纵向 2 个方格，兵卒占据 1 个方格。

```javascript
// 坐标轴方向
//     y
//     |
// x ——|——>
//     v

/**
 * [
 *   [id, width, height, x, y, hero],
 * ]
 */
const hengdaolima = [
  // [][]
  // [][]
  [CAOCAO, 2, 2, 1, 0, '曹操'],

  // []
  // []
  [HUANGZHONG, 1, 2, 0, 0, '黄忠'],

  // []
  // []
  [ZHAOYUN, 1, 2, 3, 0, '赵云'],

  // []
  // []
  [MACHAO, 1, 2, 0, 2, '马超'],

  // []
  // []
  [ZHANGFEI, 1, 2, 3, 2, '张飞'],

  // [][]
  [GUANYU, 2, 1, 1, 2, '关羽'],

  // []
  [BINGZU1, 1, 1, 0, 4, '卒1'],
  [BINGZU2, 1, 1, 1, 3, '卒2'],
  [BINGZU3, 1, 1, 2, 3, '卒3'],
  [BINGZU4, 1, 1, 3, 4, '卒4'],
]
```

上面是角色拼板定义，每种角色拼板由 id、宽、高、x 轴坐标、y 轴坐标及英雄名称构成。上述代码定义了横刀立马布局模式，实际上华容道游戏有非常多的变种布局模式，只需要调整每个武将的 x、y 坐标即可。

## 移动英雄拼块

基于 [react-dnd](https://github.com/react-dnd/react-dnd/) 拖拽库 (Drag and Drop) 实现移动英雄拼块。电脑浏览器上通过鼠标拖动拼块，手机、平板浏览器上可通过触屏手势移动拼块。

## 碰撞检测算法

拼块移动后如果超出边界或者与其他拼块有任何重合的部分，则认为本次移动会发生碰撞，放弃本次操作。

## 主要实现代码

### 华容道地图组件

定义可释放 (drop) 拼块地图，释放拼块时会进行碰撞检测

```javascript
import { Defs } from "@/lib/defs"
import Block from "./Block"
import { useDrop } from "react-dnd"

export default function Huarongdao({ playing, blocks, move }) {
  const [, drop] = useDrop(
    () => ({
      accept: 'block',
      drop: (item, monitor) => {
        const { x, y } = monitor.getDifferenceFromInitialOffset()

        if (Math.abs(x) >= Math.abs(y)) {
          if (x > 0) {
            if (!Defs.detectCollision({ ...item, x: item.x + 1 }, blocks)) {
              item.x++
              move()
            }
          } else if (x < 0) {
            if (!Defs.detectCollision({ ...item, x: item.x - 1 }, blocks)) {
              item.x--
              move()
            }
          }
        } else {
          if (y > 0) {
            if (!Defs.detectCollision({ ...item, y: item.y + 1 }, blocks)) {
              item.y++
              move()
            }
          } else if (y < 0) {
            if (!Defs.detectCollision({ ...item, y: item.y - 1 }, blocks)) {
              item.y--
              move()
            }
          }
        }
      },
    }),
    [blocks],
  )

  return (
    <div ref={drop} className={`w-${Defs.WIDTH * Defs.CUBE_SIZE_SM} md:w-${Defs.WIDTH * Defs.CUBE_SIZE} h-${Defs.HEIGHT * Defs.CUBE_SIZE_SM} md:h-${Defs.HEIGHT * Defs.CUBE_SIZE} bg-gray-100 rounded shadow relative shadow-inner-lg shadow-gray-600`}>
      {playing ? (
        blocks.map((item, i) => (
          <Block key={i} item={item} />
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
            <img src="qrcode.png" className="w-128 md:w-256" />
        </div>
      )}
    </div>
  )
}
```

### 角色拼块组件

定义可拖动 (Drag) 角色拼块

```javascript
import { Defs } from "@/lib/defs"
import { useDrag } from "react-dnd"

export default function Block({ item }) {
  const { id, w, h, x, y, hero } = item
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item])

  return (
    <div className={`w-${w * Defs.CUBE_SIZE_SM} md:w-${w * Defs.CUBE_SIZE} h-${h * Defs.CUBE_SIZE_SM} md:h-${h * Defs.CUBE_SIZE} left-${x * Defs.CUBE_SIZE_SM} md:left-${x * Defs.CUBE_SIZE} top-${y * Defs.CUBE_SIZE_SM} md:top-${y * Defs.CUBE_SIZE} absolute p-1 ${isDragging ? 'cursor-grabbing' : 'hover:cursor-grab'}`}>
      <div ref={drag} className={`w-full h-full rounded shadow-md shadow-gray-600 flex justify-center items-center text-2xl md:text-4xl text-white ${Defs.blockBgColor(id)} text-shadow`}>
        {hero}
      </div>
    </div>
  )
}
```

### 游戏页面

游戏页面保存游戏状态变量，包括所有角色拼块形状、位置、对应英雄信息以及游戏时间、移动步数计数等。

```javascript
import Huarongdao from "@/components/Huarongdao"
import { Defs } from "@/lib/defs"
import { useEffect, useRef, useState } from "react"
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"
import { time } from "@/lib/time"
import Head from "next/head"

export default function Home() {
  const [blocks, setBlocks] = useState()
  const [timer, setTimer] = useState(0)
  const [moves, setMoves] = useState(0)
  const audioRef = useRef()

  const playing = !!blocks

  const newGame = () => {
    setBlocks(Defs.layoutHendaolima())
    setTimer(0)
    setMoves(0)
    audioRef.current.play()
  }

  const move = () => setMoves(moves => moves + 1)

  useEffect(() => {
    audioRef.current = new Audio('sanguo.mp3')
    audioRef.current.loop = true
    audioRef.current.currentTime = 0
    audioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    if (playing) {
      const intervalId = setInterval(() => setTimer(timer => timer + time.SECOND), time.SECOND)
      return () => clearInterval(intervalId)
    }
  }, [playing])

  return (
    <main className="flex flex-col items-center p-4">
      <Head>
        <title>三国华容道</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico"></link>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
      </Head>

      <div className="text-4xl p-2">三国华容道</div>

      <div className="w-full py-4 flex justify-center items-center gap-4 md:gap-16 md:text-xl text-red-600">
        <div>第 {moves} 步</div>
        <div>{time.h(timer)}:{time.m(timer)}:{time.s(timer)}</div>
        <div>
          <button className="border rounded bg-red-400 text-white text-sm p-1 hover:bg-red-600 active:bg-red-400" onClick={newGame}>{playing ? '重玩游戏' : '开始游戏'}</button>
        </div>
      </div>

      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <Huarongdao blocks={blocks} playing={playing} move={move} />
      </DndProvider>

      <div className={`w-${2 * Defs.CUBE_SIZE_SM} md:w-${2 * Defs.CUBE_SIZE} flex justify-center p-1 bg-orange-400 rounded-b shadow-md shadow-gray-600`}>
        <span className="text-white text-shadow">关口</span>
      </div>
    </main>
  )
}
```