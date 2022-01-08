/*
  Warnings:

  - You are about to drop the `Variat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `variat_id` on the `Assets` table. All the data in the column will be lost.
  - Added the required column `variant_id` to the `Assets` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Variat";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "in_stock" BOOLEAN,
    CONSTRAINT "Variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "max" REAL NOT NULL,
    "min" REAL NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("id", "max", "min", "product_id") SELECT "id", "max", "min", "product_id" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price_product_id_key" ON "Price"("product_id");
CREATE TABLE "new_Assets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "source" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "variant_id" TEXT NOT NULL,
    CONSTRAINT "Assets_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "Variant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assets" ("height", "id", "source", "width") SELECT "height", "id", "source", "width" FROM "Assets";
DROP TABLE "Assets";
ALTER TABLE "new_Assets" RENAME TO "Assets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
