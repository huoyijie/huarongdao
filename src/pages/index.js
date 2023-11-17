import Huarongdao from "@/components/Huarongdao"
import { Defs } from "@/lib/defs"
import { useEffect, useRef, useState } from "react"
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"
// import { HTML5Backend } from "react-dnd-html5-backend"
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

      <div className={`w-${2 * Defs.CUBE_SIZE_SM} md:w-${2 * Defs.CUBE_SIZE} text-center text-2xl pt-2 border-x-8 border-gray-200`}>关口</div>
    </main>
  )
}
