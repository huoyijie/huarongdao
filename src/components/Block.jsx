import { Defs } from "@/lib/defs"
import { useDrag } from "react-dnd"

export default function Block({ item }) {
  const { id, w, h, x, y, hero } = item
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item])

  return (
    <div ref={drag} className={`w-${w * Defs.CUBE_SIZE_SM} md:w-${w * Defs.CUBE_SIZE} h-${h * Defs.CUBE_SIZE_SM} md:h-${h * Defs.CUBE_SIZE} left-${x * Defs.CUBE_SIZE_SM} md:left-${x * Defs.CUBE_SIZE} top-${y * Defs.CUBE_SIZE_SM} md:top-${y * Defs.CUBE_SIZE} absolute p-1 ${isDragging ? 'cursor-grabbing' : 'hover:cursor-grab'}`}>
      <div className={`w-full h-full rounded shadow-md shadow-gray-600 flex justify-center items-center text-2xl md:text-4xl text-white ${Defs.blockBgColor(id)} text-shadow`}>
        {hero}
      </div>
    </div>
  )
}