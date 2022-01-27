/*
  Warnings:

  - You are about to drop the column `commentId` on the `Reaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reactionId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reactionId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `reactionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Reaction` DROP COLUMN `commentId`;

-- CreateIndex
CREATE UNIQUE INDEX `Comment_reactionId_key` ON `Comment`(`reactionId`);
