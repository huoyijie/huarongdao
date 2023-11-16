import Huarongdao from "@/components/Huarongdao"
import { layoutHendaolima } from "@/lib/defs"
import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function Home() {
  const [blocks] = useState(layoutHendaolima())

  return (
    <main className="flex flex-col gap-8 items-center p-24">

      <div className="text-4xl">三国华容道</div>

      <div className="flex flex-col items-center">

        <DndProvider backend={HTML5Backend}>
          <Huarongdao blocks={blocks} />
        </DndProvider>

        <div className="w-256 text-center text-2xl pt-2 border-x-8 border-gray-200">关口</div>

      </div>

    </main>
  )
}
