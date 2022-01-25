/*
  Warnings:

  - You are about to drop the column `order_id` on the `Cart` table. All the data in the column will be lost.
  - The `created_at` column on the `Collection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `Discount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `SKU` on the `Product` table. All the data in the column will be lost.
  - The `created_at` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_order_id_fkey";

-- DropIndex
DROP INDEX "Cart_order_id_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "order_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "SKU",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "SKU" TEXT;

-- CreateTable
CREATE TABLE "_OrderToVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToVariant_AB_unique" ON "_OrderToVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToVariant_B_index" ON "_OrderToVariant"("B");

-- AddForeignKey
ALTER TABLE "_OrderToVariant" ADD FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToVariant" ADD FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
