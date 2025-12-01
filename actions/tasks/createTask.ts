'use server';

import { TaskFormData } from '@/app/projects/[projectId]/_components/Createtask';
import { T_ActionResponse } from '@/types/server';
import { getUserId } from '../getUserId';
import { checkProjectRole } from '../projects/checkAutorisationToManage';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createTask = async (
  taskData: TaskFormData,
  projetcId: string,
  taskMembers: string[]
): Promise<T_ActionResponse> => {
  const userId = await getUserId();
  if (!userId) return { error: 'error' };

  // check if the user has autorisation to create the task
  const isManager = await checkProjectRole(projetcId, userId, 'MANAGER');
  if (!isManager) return { error: 'unautorized' };

  // create the task
  try {
    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        priority: taskData.priority,
        taskStatus: taskData.taskStatus,
        projectId: projetcId,
        completed: false,
        creatorId: userId,
      },
    });
    const taskManager = await prisma.taskMember.create({
      data: {
        taskId: task.id,
        userId: userId,
        role: 'MANAGER',
      },
    });

    await prisma.$transaction(
      taskMembers.map((id) => {
        return prisma.taskMember.create({
          data: {
            taskId: task.id,
            userId: id,
            role: 'EMPLOYEE',
          },
        });
      })
    );

    revalidatePath('/');
    return { message: 'task created' };
  } catch (error) {
    return { error: 'task not created, try again' };
  }
};
