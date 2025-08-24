export function Button({ className = '', variant = 'default', ...props }) {
  const base = 'btn';
  const v = variant === 'outline' ? ' outline' : variant === 'ghost' ? ' ghost' : '';
  return <button className={base + v + (className ? ' ' + className : '')} {...props} />;
}
