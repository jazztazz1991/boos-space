-- CreateEnum
CREATE TYPE "boos_garden"."DayType" AS ENUM ('GOOD', 'TOUGH', 'SELF_CARE');

-- AlterTable: add new column with a default for backfill
ALTER TABLE "boos_garden"."Entry" ADD COLUMN "dayType" "boos_garden"."DayType";

-- Backfill existing rows
UPDATE "boos_garden"."Entry" SET "dayType" = CASE WHEN "didBinge" = true THEN 'TOUGH'::"boos_garden"."DayType" ELSE 'GOOD'::"boos_garden"."DayType" END;

-- Make column non-nullable now that all rows are backfilled
ALTER TABLE "boos_garden"."Entry" ALTER COLUMN "dayType" SET NOT NULL;

-- Drop old column
ALTER TABLE "boos_garden"."Entry" DROP COLUMN "didBinge";
