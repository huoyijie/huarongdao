import { CUBE_SIZE, WIDTH, HEIGHT } from "@/lib/defs"
import Block from "./Block"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function Huarongdao({ blocks }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`w-${WIDTH * CUBE_SIZE} h-${HEIGHT * CUBE_SIZE} bg-gray-200 rounded shadow relative`}>
        {blocks.map(([w, h, x, y, hero], i) => (
          <Block key={i} w={w} h={h} x={x} y={y} hero={hero} />
        ))}
      </div>
    </DndProvider>
  )
}