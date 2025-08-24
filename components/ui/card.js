export function Card({ className = '', ...props }) { return <div className={'card ' + className} {...props} />; }
export function CardHeader({ className = '', ...props }) { return <div className={'card ' + className} {...props} />; }
export function CardTitle({ className = '', ...props }) { return <div className={'font-semibold text-lg ' + className} {...props} />; }
export function CardDescription({ className = '', ...props }) { return <div className={'text-sm text-slate-500 ' + className} {...props} />; }
export function CardContent({ className = '', ...props }) { return <div className={className} {...props} />; }
