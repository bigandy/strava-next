/*
  Warnings:

  - Added the required column `strava_athlete_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "strava_athlete_id" INTEGER NOT NULL;
