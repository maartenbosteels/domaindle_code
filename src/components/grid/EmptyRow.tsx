import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}

      <div className="letter-container correct shadowed w-14 h-14  flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white">
        .be
      </div>


    </div>
)
}
