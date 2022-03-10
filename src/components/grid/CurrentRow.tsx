import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
}

export const CurrentRow = ({ guess, className }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}

      <div className="letter-container correct shadowed w-14 h-14  flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white">
        .be
      </div>

    </div>
  )
}
