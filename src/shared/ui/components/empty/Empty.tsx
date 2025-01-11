export const EmptyComponent = ({
  className,
  description = 'Нет данных',
  showIllustration = true,
}: {
  className?: string
  showIllustration?: boolean
  description?: string
}) => {
  return (
    <div className={className}>
      {showIllustration && <div className="illustration">😔</div>}
      <div className="description">{description}</div>
    </div>
  )
}
