import Huarongdao from "@/components/Huarongdao"
import { BLOCK_LAYOUT_HENDAOLIMA } from "@/lib/defs"
import { useState } from "react"

export default function Home() {
  const [blocks, setBlocks] = useState(BLOCK_LAYOUT_HENDAOLIMA)

  return (
    <main className="flex flex-col gap-8 items-center p-24">

      <div className="text-4xl">三国华容道</div>

      <div className="flex flex-col items-center">

        <Huarongdao blocks={blocks} />

        <div className="w-256 text-center text-2xl pt-2 border-x-8 border-gray-200">关口</div>

      </div>

    </main>
  )
}
