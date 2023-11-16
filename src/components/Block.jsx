import { CAOCAO, CUBE_SIZE, GUANYU, HUANGZHONG, MACHAO, ZHANGFEI, ZHAOYUN } from "@/lib/defs"

export default function Block({ w, h, x, y, hero }) {
  let bgColor = 'bg-green-400'
  switch (hero) {
    case CAOCAO:
      bgColor = 'bg-blue-400'
      break

    case GUANYU:
      bgColor = 'bg-red-400'
      break

    case ZHANGFEI:
      bgColor = 'bg-gray-600'
      break

    case HUANGZHONG:
      bgColor = 'bg-yellow-400'
      break

    case ZHAOYUN:
      bgColor = 'bg-orange-400'
      break

    case MACHAO:
      bgColor = 'bg-sky-400'
      break
  }

  return (
    <div className={`w-${w * CUBE_SIZE} h-${h * CUBE_SIZE} left-${x * CUBE_SIZE} top-${y * CUBE_SIZE} absolute p-0.5`}>
      <div className={`w-full h-full rounded shadow-lg flex justify-center items-center text-4xl text-white ${bgColor}`}>
        {hero}
      </div>
    </div>
  )
}