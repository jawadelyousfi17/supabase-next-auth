'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <Card className="">
          <CardContent className="pt-6 pb-8 px-6">
            <div className="flex flex-col items-center text-center gap-6">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <ShieldAlert className="h-10 w-10 text-destructive" />
                </div>
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-destructive/20 animate-ping" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="space-y-3"
              >
                <h1 className="text-2xl font-bold text-foreground">
                  Access Denied
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You don't have permission to access this organization. Please
                  contact your administrator for access.
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex gap-3 w-full"
              >
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button
                  onClick={() => (window.location.href = '/organizations')}
                  className="flex-1"
                >
                  Organizations
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
