import { CUBE_SIZE, WIDTH, HEIGHT } from "@/lib/defs"
import Block from "./Block"

export default function Huarongdao({ blocks }) {
  return (
    <div className={`w-${WIDTH * CUBE_SIZE} h-${HEIGHT * CUBE_SIZE} bg-gray-200 rounded shadow relative`}>
      {blocks.map(([w, h, x, y, hero], i) => (
        <Block key={i} w={w} h={h} x={x} y={y} hero={hero} />
      ))}
    </div>
  )
}