/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Like` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "tweet_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "tweet_id"),
    CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("created_at", "tweet_id", "user_id") SELECT "created_at", "tweet_id", "user_id" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
