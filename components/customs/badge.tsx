import { cn } from '@/lib/utils';

type T_Props = {
  variant: 'low' | 'high' | 'medium';
};

const C_Badge = ({ variant }: T_Props) => {
  const colors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs uppercase tracking-wide transition-all',
        colors[variant]
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current font-bold" />
     <span className='font-bold'>
      {variant} 
      </span> 
    </div>
  );
};

export default C_Badge;
