-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `minus` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `plus` INTEGER NOT NULL DEFAULT 0;
