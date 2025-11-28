/*
  Warnings:

  - You are about to drop the column `updtatedAt` on the `Task` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EMPLOYEE', 'MANAGER', 'DIRECTOR', 'CEO');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "updtatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EMPLOYEE';
