import CustomCountUp from "@/components/_ui/count-up/custom-count-up.component"
import fetchArticlesCount from "@/lib/data/fetch-articles-count"
import Link from "next/link"

export const ANIMATION_DURATION = 1

const LogsButton: React.FC = () => {
  // const articleCount = await fetchArticlesCount()

  // const {
  //   setTrue: setCountUpIsFinished,
  //   setFalse: setCountUpIsNotFinished,
  //   value: countUpIsFinished,
  // } = useBoolean(false)

  // const handleCountUpIsFinished = () => {
  //   setTimeout(
  //     () => {
  //       setCountUpIsFinished()
  //     },
  //     (ANIMATION_DURATION / 10) * 1000
  //   )
  // }

  return (
    <Link href="/logs" passHref>
      <button className="flex w-full h-[48px] items-center justify-between px-4 hover:bg-secondary">
        <p className="h3 text-primary">Logs</p>

        {/* {articleCount ? <CustomCountUp number={articleCount} delay={0} duration={ANIMATION_DURATION} /> : "..."} */}
      </button>
    </Link>
  )
}

export default LogsButton
