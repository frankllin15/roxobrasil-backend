/*
  Warnings:

  - The primary key for the `Assets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Assets` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "source" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "variat_id" TEXT NOT NULL,
    CONSTRAINT "Assets_variat_id_fkey" FOREIGN KEY ("variat_id") REFERENCES "Variat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assets" ("height", "id", "source", "variat_id", "width") SELECT "height", "id", "source", "variat_id", "width" FROM "Assets";
DROP TABLE "Assets";
ALTER TABLE "new_Assets" RENAME TO "Assets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
