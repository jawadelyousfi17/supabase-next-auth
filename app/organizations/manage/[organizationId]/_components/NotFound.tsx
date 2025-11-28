'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft} from 'lucide-react';
import { AppleAnimation } from '@/components/customs/Animation';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <AppleAnimation>
        <div className="">
          <div className="pt-10 pb-10 px-6">
            <div className="flex flex-col items-center text-center gap-6">
              <AppleAnimation delay={0.05}>
                <span className=" text-6xl">🙂‍↔️</span>
                <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-sm"></div>
              </AppleAnimation>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Organization Not Found
                </h2>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  The organization you are looking for doesn't exist, or you may
                  not have the required permissions to view it.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppleAnimation>{' '}
    </div>
  );
};

export default NotFound;
