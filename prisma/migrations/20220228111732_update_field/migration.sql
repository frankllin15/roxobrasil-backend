/*
  Warnings:

  - The primary key for the `Assets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AssetsToVariant" DROP CONSTRAINT "_AssetsToVariant_A_fkey";

-- AlterTable
ALTER TABLE "Assets" DROP CONSTRAINT "Assets_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Assets_id_seq";

-- AlterTable
ALTER TABLE "_AssetsToVariant" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_AssetsToVariant" ADD FOREIGN KEY ("A") REFERENCES "Assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
