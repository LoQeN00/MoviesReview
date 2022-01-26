/*
  Warnings:

  - Added the required column `reactions` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `reactions` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `_CommentToUser` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CommentToUser_AB_unique`(`A`, `B`),
    INDEX `_CommentToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
