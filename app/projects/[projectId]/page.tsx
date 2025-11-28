import { Circle, Clock, CheckCircle2, Plus } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';


import CBreadComp from '@/components/customs/CBreadComp';

const Dashboard = async () => {
  return (
    <div className="min-h-screen bg-background ">
      {/* Header */}
  

      {/* Kanban Board */}
      <div className="grid grid-cols-3 gap-6">
        {/* Not Started Column */}
        <div className="flex flex-col gap-4 h-[calc(100vh-160px)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-muted">
                <Circle className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="font-semibold text-foreground">Not Started</span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-muted text-muted-foreground rounded-full">
                3
              </span>
            </div>
            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="overflow-y-auto space-y-3 pb-4">
            <TaskCard
              taskName="Task 1"
              priority="medium"
              isCompleted={false}
              dateCreated={new Date('2025-11-15')}
              deadline={new Date('2025-11-30')}
              taskCreatorName="Jawad elyousfi"
              taskCreatorAvatar=""
              taskCreatorLabel="Project manager"
              status="not_started"
              category="DEV OPS"
            />
          </div>
        </div>

        {/* In Progress Column */}
        <div className="flex flex-col gap-4 h-[calc(100vh-160px)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">In Progress</span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                3
              </span>
            </div>
            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="overflow-y-auto space-y-3 pb-4">
            <TaskCard
              taskName="Task 1"
              priority="medium"
              isCompleted={false}
              dateCreated={new Date('2025-11-15')}
              deadline={new Date('2025-11-30')}
              taskCreatorName="Jawad elyousfi"
              taskCreatorAvatar=""
              taskCreatorLabel="Project manager"
              status="in_progress"
              category="DEV OPS"
            />
          </div>
        </div>

        {/* Finished Column */}
        <div className="flex flex-col gap-4 h-[calc(100vh-160px)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-950">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-semibold text-foreground">Completed</span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full">
                3
              </span>
            </div>
            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="overflow-y-auto space-y-3 pb-4">
            <TaskCard
              taskName="Task 1"
              priority="high"
              isCompleted={false}
              dateCreated={new Date('2025-11-15')}
              deadline={new Date('2025-12-30')}
              taskCreatorName="Jawad elyousfi"
              taskCreatorAvatar=""
              taskCreatorLabel="Project manager"
              status="finished"
              category="DEV OPS"
            />

            <TaskCard
              taskName="Task 1"
              priority="high"
              isCompleted={false}
              dateCreated={new Date('2025-11-15')}
              deadline={new Date('2025-12-30')}
              taskCreatorName="Jawad elyousfi"
              taskCreatorAvatar=""
              taskCreatorLabel="Project manager"
              status="finished"
              category="DEV OPS"
            />

            <TaskCard
              taskName="Task 1"
              priority="high"
              isCompleted={false}
              dateCreated={new Date('2025-11-15')}
              deadline={new Date('2025-12-30')}
              taskCreatorName="Jawad elyousfi"
              taskCreatorAvatar=""
              taskCreatorLabel="Project manager"
              status="finished"
              category="DEV OPS"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
