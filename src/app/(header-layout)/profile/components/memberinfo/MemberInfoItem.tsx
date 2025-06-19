export default function MemberInfoItem({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <li className="body4 flex items-center">
      <span className="w-20 text-gray-500">{label}</span>
      <span className="text-gray-900">{value}</span>
    </li>
  )
}
