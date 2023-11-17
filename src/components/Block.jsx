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
    <div ref={drag} className={`w-${w * Defs.CUBE_SIZE_SM} md:w-${w * Defs.CUBE_SIZE} h-${h * Defs.CUBE_SIZE_SM} md:h-${h * Defs.CUBE_SIZE} left-${x * Defs.CUBE_SIZE_SM} md:left-${x * Defs.CUBE_SIZE} top-${y * Defs.CUBE_SIZE_SM} md:top-${y * Defs.CUBE_SIZE} absolute p-0.5 hover:cursor-grab ${isDragging ? 'opacity-50' : ''}`}>
      <div className={`w-full h-full rounded shadow-lg flex justify-center items-center text-2xl md:text-4xl text-white ${Defs.blockBgColor(id)}`}>
        {hero}
      </div>
    </div>
  )
}