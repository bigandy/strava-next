-- CreateTable
CREATE TABLE "verification_requests" (
"id" SERIAL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
"id" SERIAL,
    "iid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "distance" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "average_speed" DECIMAL(65,30) NOT NULL,
    "average_cadence" DECIMAL(65,30) NOT NULL,
    "location_country" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests.token_unique" ON "verification_requests"("token");

-- CreateIndex
CREATE UNIQUE INDEX "activities.iid_unique" ON "activities"("iid");

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
