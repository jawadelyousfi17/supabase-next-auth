import { TaskStatus } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';

type T_Props = {
  variant: TaskStatus;
};

const C_Status = ({ variant, ...props }: T_Props) => {
  const colors: Record<TaskStatus, string> = {
    NOT_STARTED:
      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    IN_PROGRESS:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    COMPLETED:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    IGNORED:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    ARCHIVED:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  };

  const labels: Record<TaskStatus, string> = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    IGNORED: 'Ignored',
    ARCHIVED: 'Archived',
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
      {labels[variant]}
    </div>
  );
};

export default C_Status;
