'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useTransition } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createTask } from '@/actions/tasks/createTask';
import { T_ProjectData } from '@/actions/projects/createProject';
import { T_ProjectWithMemebersAndCreators } from '@/actions/projects/getProjectById';
import { Card, CardContent } from '@/components/ui/card';

interface CreateTaskProps {
  projectId: string;
  project: T_ProjectWithMemebersAndCreators;
  trigger?: React.ReactNode;
}

export type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  priority: 'LOW' | 'INTERMEDIATE' | 'HIGH';
  taskStatus:
    | 'NOT_STARTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'IGNORED'
    | 'ARCHIVED';
};

export default function CreateTask({
  projectId,
  project,
  trigger,
}: CreateTaskProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setisPending] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'LOW',
    taskStatus: 'NOT_STARTED',
  });

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const filteredMembers = project.projectMemebers?.filter(
    (member) =>
      member.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisPending(true);
    const { error, message } = await createTask(
      formData,
      projectId,
      selectedMembers
    );
    if (message) {
      toast.success(message);
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'LOW',
        taskStatus: 'NOT_STARTED',
      });
      setSelectedMembers([]);
    }
    if (error) toast.error(error);
    setisPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task and assign team members to collaborate.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 overflow-hidden"
        >
          <div className="space-y-4 overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="title">Task Name *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Design landing page"
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Provide details about this task..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      priority: value as TaskFormData['priority'],
                    })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="INTERMEDIATE">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.taskStatus}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      taskStatus: value as TaskFormData['taskStatus'],
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="IGNORED">Ignored</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label>Assign Team Members</Label>
              <p className="text-sm text-muted-foreground">
                Select members to assign to this task ({selectedMembers.length}{' '}
                selected)
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search members by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                {filteredMembers && filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => {
                    const isSelected = selectedMembers.includes(member.user.id);
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => toggleMember(member.user.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all hover:bg-accent ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={member.user.avatar}
                              alt={member.user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 text-primary-foreground"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="font-medium text-sm">
                              {member.user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {member.user.email}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    {searchQuery
                      ? 'No members found matching your search.'
                      : 'No team members available.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
