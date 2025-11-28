import { cn } from '@/lib/utils';

type T_Props = {
  variant: 'not_started' | 'in_progress' | 'finished';
};

const C_Status = ({ variant, ...props }: T_Props) => {
  const colors: Record<T_Props['variant'], string> = {
    not_started:
      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    in_progress:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    finished:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  return (
    <div
      className={cn(
        'cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-[11px] tracking-wide transition-all select-none',

        colors[variant]
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current font-semibold" />
      {variant.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
    </div>
  );
};

export default C_Status;
