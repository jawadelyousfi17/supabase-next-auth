-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'ENTRPRISE');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "companiy_size" "CompanySize" NOT NULL,
    "adress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timzone" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
