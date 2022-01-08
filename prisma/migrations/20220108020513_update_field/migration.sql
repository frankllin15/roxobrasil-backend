/*
  Warnings:

  - The primary key for the `Price` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Price` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "max" REAL NOT NULL,
    "min" REAL NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("id", "max", "min", "product_id") SELECT "id", "max", "min", "product_id" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price_product_id_key" ON "Price"("product_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
