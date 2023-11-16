import Huarongdao from "@/components/Huarongdao"
import { BING, CAOCAO, GUANYU, HUANGZHONG, MACHAO, ZHANGFEI, ZHAOYUN } from "@/lib/defs"

export default function Home() {
  const blocks = [
    [2, 2, 1, 0, CAOCAO],
    [1, 2, 0, 0, ZHAOYUN],
    [1, 2, 3, 0, MACHAO],
    [1, 2, 0, 2, HUANGZHONG],
    [1, 2, 3, 2, ZHANGFEI],
    [2, 1, 1, 2, GUANYU],
    [1, 1, 1, 3, BING],
    [1, 1, 2, 3, BING],
    [1, 1, 0, 4, BING],
    [1, 1, 3, 4, BING],
  ]

  return (
    <main className="flex flex-col gap-8 items-center p-24">

      <div className="text-4xl">三国华容道</div>

      <div className="flex flex-col items-center">

        <Huarongdao blocks={blocks} />

        <div className="w-256 text-center text-2xl pt-2 border-x-8 border-gray-200">关口</div>

      </div>

    </main>
  )
}
