-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tweet" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Tweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tweet" ("created_at", "id", "tweet", "updated_at", "user_id") SELECT "created_at", "id", "tweet", "updated_at", "user_id" FROM "Tweet";
DROP TABLE "Tweet";
ALTER TABLE "new_Tweet" RENAME TO "Tweet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
