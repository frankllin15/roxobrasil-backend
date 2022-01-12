/*
  Warnings:

  - Added the required column `created_at` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exipires` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "exipires" TEXT NOT NULL;
