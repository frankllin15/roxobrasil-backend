/*
  Warnings:

  - You are about to drop the column `decription` on the `Discount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "decription",
ADD COLUMN     "description" TEXT;
