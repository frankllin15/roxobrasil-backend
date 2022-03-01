/*
  Warnings:

  - You are about to drop the column `variant_id` on the `Assets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assets" DROP CONSTRAINT "Assets_variant_id_fkey";

-- AlterTable
ALTER TABLE "Assets" DROP COLUMN "variant_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_AssetsToVariant" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssetsToVariant_AB_unique" ON "_AssetsToVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetsToVariant_B_index" ON "_AssetsToVariant"("B");

-- AddForeignKey
ALTER TABLE "_AssetsToVariant" ADD FOREIGN KEY ("A") REFERENCES "Assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetsToVariant" ADD FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
