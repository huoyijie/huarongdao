import { CUBE_SIZE, WIDTH, HEIGHT } from "@/lib/defs"
import Block from "./Block"
import { useDrop } from "react-dnd"

export default function Huarongdao({ blocks }) {
  const [, drop] = useDrop(
    () => ({
      accept: 'block',
      drop: (item, monitor) => {
        const { x, y } = monitor.getDifferenceFromInitialOffset()

        if (Math.abs(x) >= Math.abs(y)) {
          if (x > CUBE_SIZE / 2) {
            item.x++
          } else if (x < -CUBE_SIZE / 2) {
            item.x--
          }
        } else {
          if (y > CUBE_SIZE / 2) {
            item.y++
          } else if (y < -CUBE_SIZE / 2) {
            item.y--
          }
        }
      },
    })
  )

  return (
    <div ref={drop} className={`w-${WIDTH * CUBE_SIZE} h-${HEIGHT * CUBE_SIZE} bg-gray-200 rounded shadow relative`}>
      {blocks.map((item, i) => (
        <Block key={i} item={item} />
      ))}
    </div>
  )
}