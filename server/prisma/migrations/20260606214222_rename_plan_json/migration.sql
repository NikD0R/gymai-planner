/*
  Warnings:

  - You are about to drop the column `plan_data` on the `training_plans` table. All the data in the column will be lost.
  - Added the required column `plan_json` to the `training_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "training_plans" DROP COLUMN "plan_data",
ADD COLUMN     "plan_json" JSONB NOT NULL;
