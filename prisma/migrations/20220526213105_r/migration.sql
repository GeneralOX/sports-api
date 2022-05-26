/*
  Warnings:

  - You are about to drop the `league_teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `league_teams` DROP FOREIGN KEY `League_Teams_leagueId_fkey`;

-- DropForeignKey
ALTER TABLE `league_teams` DROP FOREIGN KEY `League_Teams_teamId_fkey`;

-- AlterTable
ALTER TABLE `ranking` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `league_teams`;
