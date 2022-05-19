/*
  Warnings:

  - You are about to drop the column `username` on the `entreprise` table. All the data in the column will be lost.
  - Added the required column `email` to the `Entreprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `entreprise` DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
