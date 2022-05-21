-- AlterTable
ALTER TABLE `league` ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `isLeader` INTEGER NULL DEFAULT 0;
