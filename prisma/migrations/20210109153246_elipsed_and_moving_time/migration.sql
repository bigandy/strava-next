/*
  Warnings:

  - Added the required column `elapsed_time` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moving_time` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "elapsed_time" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "moving_time" DECIMAL(65,30) NOT NULL;
