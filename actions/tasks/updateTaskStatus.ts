"use server";


import { TaskStatus } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        taskStatus: newStatus,
      },
    });

    return {
      success: true,
      message: "Task status updated successfully",
      data: updatedTask,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update task status",
      data: null,
    };
  }
}
