/*
  Warnings:

  - You are about to drop the column `reactionId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Comment_reactionId_key` ON `Comment`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `reactionId`;

-- AlterTable
ALTER TABLE `Reaction` ADD COLUMN `commentId` INTEGER NOT NULL;
