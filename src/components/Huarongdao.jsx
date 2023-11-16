import { CUBE_SIZE, WIDTH, HEIGHT, detectCollision } from "@/lib/defs"
import Block from "./Block"
import { useDrop } from "react-dnd"

export default function Huarongdao({ blocks, move }) {
  const [, drop] = useDrop(
    () => ({
      accept: 'block',
      drop: (item, monitor) => {
        const { x, y } = monitor.getDifferenceFromInitialOffset()

        if (Math.abs(x) >= Math.abs(y)) {
          if (x > CUBE_SIZE / 2) {
            if (!detectCollision({ ...item, x: item.x + 1 }, blocks)) {
              item.x++
              move()
            }
          } else if (x < -CUBE_SIZE / 2) {
            if (!detectCollision({ ...item, x: item.x - 1 }, blocks)) {
              item.x--
              move()
            }
          }
        } else {
          if (y > CUBE_SIZE / 2) {
            if (!detectCollision({ ...item, y: item.y + 1 }, blocks)) {
              item.y++
              move()
            }
          } else if (y < -CUBE_SIZE / 2) {
            if (!detectCollision({ ...item, y: item.y - 1 }, blocks)) {
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
    <div ref={drop} className={`w-${WIDTH * CUBE_SIZE} h-${HEIGHT * CUBE_SIZE} bg-gray-200 rounded shadow relative`}>
      {blocks && blocks.map((item, i) => (
        <Block key={i} item={item} />
      ))}
    </div>
  )
}