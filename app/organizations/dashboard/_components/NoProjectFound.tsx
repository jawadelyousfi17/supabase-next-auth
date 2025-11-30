'use client';

import { Button } from '@/components/ui/button';
import { FolderPlus } from 'lucide-react';

type T_Props = {
  onCreateClick?: () => void;
  isManager: boolean;
};

const NoProjectFound = ({ onCreateClick, isManager }: T_Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6 text-8xl">📂</div>

      <h3 className="text-2xl font-semibold text-foreground mb-2">
        No Projects Yet
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Get started by creating your first project. Organize your tasks,
        collaborate with your team, and bring your ideas to life.
      </p>

      {isManager && (
        <Button
          onClick={onCreateClick}
          size="lg"
          className="gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <FolderPlus className="w-5 h-5" />
          Create Your First Project
        </Button>
      )}
    </div>
  );
};

export default NoProjectFound;
