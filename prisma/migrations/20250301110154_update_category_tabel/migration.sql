/*
  Warnings:

  - Added the required column `gender` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "gender" "Gender" NOT NULL;
