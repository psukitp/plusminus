export const LoaderComponent = ({
  className,
}: {
  className?: string
  align?: 'start' | 'end' | 'center'
  size?: number
}) => {
  return (
    <div className={className}>
      <div className="spinner"></div>
    </div>
  )
}
