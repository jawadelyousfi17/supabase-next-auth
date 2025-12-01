import { Priority } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';
import { Flag } from 'lucide-react';

type T_Props = {
  variant: Priority;
};

const C_Badge = ({ variant }: T_Props) => {
  const colors: Record<Priority, string> = {
    LOW: ' text-blue-800  dark:text-blue-300',
    INTERMEDIATE: ' text-yellow-800  dark:text-yellow-300',
    HIGH: ' text-red-800  dark:text-red-300',
  };

  const labels: Record<Priority, string> = {
    LOW: 'Low',
    INTERMEDIATE: 'Medium',
    HIGH: 'High',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs uppercase tracking-wide transition-all',
        colors[variant]
      )}
    >
      <Flag className="w-3 h-3" />
      <span className="font-bold">{labels[variant]}</span>
    </div>
  );
};

export default C_Badge;
