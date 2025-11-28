/*
  Warnings:

  - You are about to drop the column `companiy_size` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `company_size` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrgRole" AS ENUM ('OWNER', 'MANAGER', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "companiy_size",
ADD COLUMN     "company_size" "CompanySize" NOT NULL,
ALTER COLUMN "timzone" SET DEFAULT 'UTC',
ALTER COLUMN "timzone" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "OrganizationMember" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "OrgRole" NOT NULL,

    CONSTRAINT "OrganizationMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
