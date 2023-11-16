import { CUBE_SIZE, blockBgColor } from "@/lib/defs"
import { useDrag } from "react-dnd"

export default function Block({ item }) {
  const { w, h, x, y, hero } = item
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item])

  return (
    <div ref={drag} className={`w-${w * CUBE_SIZE} h-${h * CUBE_SIZE} left-${x * CUBE_SIZE} top-${y * CUBE_SIZE} absolute p-0.5 hover:cursor-grab ${isDragging ? 'opacity-50' : ''}`}>
      <div className={`w-full h-full rounded shadow-lg flex justify-center items-center text-4xl text-white ${blockBgColor(hero)}`}>
        {hero}
      </div>
    </div>
  )
}