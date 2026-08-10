/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';

-- CreateIndex
CREATE UNIQUE INDEX "Users_slug_key" ON "Users"("slug");
