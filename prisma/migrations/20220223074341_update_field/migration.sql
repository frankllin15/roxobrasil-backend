/*
  Warnings:

  - You are about to drop the column `descrition` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT;
