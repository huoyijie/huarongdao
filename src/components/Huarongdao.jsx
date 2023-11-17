import { Defs } from "@/lib/defs"
import Block from "./Block"
import { useDrop } from "react-dnd"

export default function Huarongdao({ blocks, move }) {
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
      {blocks && blocks.map((item, i) => (
        <Block key={i} item={item} />
      ))}
    </div>
  )
}