import { CUBE_SIZE, blockBgColor } from "@/lib/defs"

export default function Block({ w, h, x, y, hero }) {
  return (
    <div className={`w-${w * CUBE_SIZE} h-${h * CUBE_SIZE} left-${x * CUBE_SIZE} top-${y * CUBE_SIZE} absolute p-0.5 hover:cursor-grab`}>
      <div className={`w-full h-full rounded shadow-lg flex justify-center items-center text-4xl text-white ${blockBgColor(hero)}`}>
        {hero}
      </div>
    </div>
  )
}