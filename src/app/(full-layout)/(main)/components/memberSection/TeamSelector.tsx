import { Team } from '@/app/(full-layout)/(main)/types/member'
import clsx from 'clsx'

interface TeamSelectorProps {
  teams: Team[]
  selectedTeam: number
  onTeamSelect: (teamId: number) => void
}

// 팀 선택 버튼 컴포넌트
export default function TeamSelector({ teams, selectedTeam, onTeamSelect }: TeamSelectorProps) {
  return (
    <div className="scroll-hidden flex items-center gap-2 overflow-x-scroll px-4">
      {teams.map((team) => (
        <div
          key={team.code}
          className={clsx(
            'flex flex-shrink-0 cursor-pointer items-center justify-center rounded-[20px] px-4 py-2',
            selectedTeam === team.id ? 'bg-purple-500' : 'border border-gray-200',
          )}
          onClick={() => onTeamSelect(team.id)}
        >
          <span className={clsx('body4', selectedTeam === team.id ? 'text-white' : 'text-black')}>
            {team.name}
          </span>
        </div>
      ))}
    </div>
  )
}
