/*
  Warnings:

  - You are about to drop the column `descrition` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT;
