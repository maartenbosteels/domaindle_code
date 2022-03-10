import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
      {/*// border-solid border-2*/}
      <div className="letter-container correct shadowed w-14 h-14  flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white">
        .be
      </div>
    </div>
  )
}
