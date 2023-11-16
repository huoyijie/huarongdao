import Huarongdao from "@/components/Huarongdao"
import { layoutHendaolima } from "@/lib/defs"
import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function Home() {
  const [blocks, setBlocks] = useState(layoutHendaolima())

  return (
    <main className="p-24">

      <div className="flex gap-8 justify-center items-center">

        <div>
          <button className="border rounded-lg bg-red-400 text-white p-4 hover:bg-red-600 active:bg-red-400" onClick={() => setBlocks(layoutHendaolima())}>重新布局</button>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl mb-8">三国华容道</div>

          <DndProvider backend={HTML5Backend}>
            <Huarongdao blocks={blocks} />
          </DndProvider>

          <div className="w-256 text-center text-2xl pt-2 border-x-8 border-gray-200">关口</div>
        </div>

        <div className="flex flex-col gap-8">
          <div>time</div>
          <div>steps</div>
        </div>

      </div>

    </main>
  )
}
