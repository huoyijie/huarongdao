import Huarongdao from "@/components/Huarongdao"
import { layoutHendaolima } from "@/lib/defs"
import { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { time } from "@/lib/time"

export default function Home() {
  const [blocks, setBlocks] = useState(layoutHendaolima())
  const [timer, setTimer] = useState(0)
  const [moves, setMoves] = useState(0)

  const newGame = () => {
    setBlocks(layoutHendaolima())
    setTimer(0)
    setMoves(0)
  }

  const move = () => setMoves(moves => moves + 1)

  useEffect(() => {
    const intervalId = setInterval(() => setTimer(timer => timer + time.SECOND), time.SECOND)
    return () => clearInterval(intervalId)
  }, [blocks])

  return (
    <main className="p-24">

      <div className="flex gap-8 justify-center items-center">

        <div>
          <button className="border rounded-lg bg-red-400 text-white p-4 hover:bg-red-600 active:bg-red-400" onClick={newGame}>重新布局</button>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl mb-8">三国华容道</div>

          <DndProvider backend={HTML5Backend}>
            <Huarongdao blocks={blocks} move={move} />
          </DndProvider>

          <div className="w-256 text-center text-2xl pt-2 border-x-8 border-gray-200">关口</div>
        </div>

        <div className="flex flex-col gap-8 text-xl text-red-600">
          <div>时间 {time.h(timer)}:{time.m(timer)}:{time.s(timer)}</div>
          <div>步数 {moves}</div>
        </div>

      </div>

    </main>
  )
}
