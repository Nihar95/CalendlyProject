-- CreateTable
CREATE TABLE "availablity_rules" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weekday" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availablity_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "availablity_rules_userId_weekday_idx" ON "availablity_rules"("userId", "weekday");

-- AddForeignKey
ALTER TABLE "availablity_rules" ADD CONSTRAINT "availablity_rules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
