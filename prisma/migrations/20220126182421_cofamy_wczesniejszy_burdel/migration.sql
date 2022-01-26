/*
  Warnings:

  - You are about to drop the column `reactions` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `_CommentToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `reactions`;

-- DropTable
DROP TABLE `_CommentToUser`;
