-- CreateTable
CREATE TABLE "Assets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "variat_id" TEXT NOT NULL,
    CONSTRAINT "Assets_variat_id_fkey" FOREIGN KEY ("variat_id") REFERENCES "Variat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Variat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "in_stock" BOOLEAN,
    CONSTRAINT "Variat_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "max" REAL NOT NULL,
    "min" REAL NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "descrition" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Price_product_id_key" ON "Price"("product_id");
