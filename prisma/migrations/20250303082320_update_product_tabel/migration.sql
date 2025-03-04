/*
  Warnings:

  - Added the required column `care` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compound` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `сountry` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "care" TEXT NOT NULL,
ADD COLUMN     "compound" TEXT NOT NULL,
ADD COLUMN     "сountry" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
