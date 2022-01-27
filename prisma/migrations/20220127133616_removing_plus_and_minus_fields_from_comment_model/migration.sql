/*
  Warnings:

  - You are about to drop the column `minus` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `plus` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `minus`,
    DROP COLUMN `plus`;
