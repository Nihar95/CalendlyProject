-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "event_types" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "durationInMins" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "locationType" TEXT NOT NULL DEFAULT 'online',
    "locationValue" TEXT,
    "bufferBeforeMinutes" INTEGER NOT NULL DEFAULT 0,
    "bufferAfterMinutes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_types" ADD CONSTRAINT "event_types_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
