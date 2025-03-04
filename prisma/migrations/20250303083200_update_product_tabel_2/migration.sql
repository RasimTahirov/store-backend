/*
  Warnings:

  - You are about to drop the column `сountry` on the `products` table. All the data in the column will be lost.
  - Added the required column `country` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "сountry",
ADD COLUMN     "country" TEXT NOT NULL;
