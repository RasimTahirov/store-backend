/*
  Warnings:

  - Added the required column `gender` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNISEX');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "gender" "Gender" NOT NULL;
