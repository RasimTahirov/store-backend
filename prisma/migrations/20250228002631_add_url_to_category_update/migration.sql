/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_url_key" ON "categories"("url");
