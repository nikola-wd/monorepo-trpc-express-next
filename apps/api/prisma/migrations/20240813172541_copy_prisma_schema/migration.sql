/*
  Warnings:

  - You are about to drop the `TestPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OverrideType" AS ENUM ('WORKING', 'NOT_WORKING');

-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('NON_REPEATING', 'REPEATS_EACH_YEAR');

-- CreateEnum
CREATE TYPE "DateType" AS ENUM ('SINGLE', 'RANGE');

-- DropForeignKey
ALTER TABLE "TestPost" DROP CONSTRAINT "TestPost_authorId_fkey";

-- DropTable
DROP TABLE "TestPost";

-- DropTable
DROP TABLE "TestUser";

-- CreateTable
CREATE TABLE "PasswordResetRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "requestIp" TEXT NOT NULL,
    "requestCount" INTEGER NOT NULL DEFAULT 0,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedResetAt" TIMESTAMP(3),

    CONSTRAINT "PasswordResetRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "businessGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BusinessGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeAssignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EmployeeAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "clientId" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteBusiness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "clientId" TEXT,

    CONSTRAINT "FavoriteBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCategory" (
    "businessId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY ("businessId","categoryId")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessService" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BusinessService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaySchedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT true,
    "scheduleTemplateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DaySchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeBlock" (
    "id" TEXT NOT NULL,
    "startTime" DECIMAL(4,2) NOT NULL,
    "endTime" DECIMAL(4,2) NOT NULL,
    "dayScheduleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "overrideId" TEXT,

    CONSTRAINT "TimeBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverrideTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OverrideTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Override" (
    "id" TEXT NOT NULL,
    "overrideType" "OverrideType" NOT NULL,
    "durationType" "DurationType" NOT NULL,
    "dateType" "DateType" NOT NULL DEFAULT 'SINGLE',
    "startDay" INTEGER NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "startYear" INTEGER,
    "endDay" INTEGER,
    "endMonth" INTEGER,
    "endYear" INTEGER,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "explanation" TEXT,
    "overrideTemplateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Override_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetRequest_token_key" ON "PasswordResetRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeAssignment_businessId_userId_key" ON "EmployeeAssignment"("businessId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_userId_businessId_serviceId_startTime_key" ON "Reservation"("userId", "businessId", "serviceId", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteBusiness_userId_businessId_key" ON "FavoriteBusiness"("userId", "businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_createdBy_key" ON "Category"("name", "createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessService_businessId_serviceId_key" ON "BusinessService"("businessId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "DaySchedule_scheduleTemplateId_dayOfWeek_key" ON "DaySchedule"("scheduleTemplateId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "Override_overrideTemplateId_key" ON "Override"("overrideTemplateId");

-- AddForeignKey
ALTER TABLE "PasswordResetRequest" ADD CONSTRAINT "PasswordResetRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_businessGroupId_fkey" FOREIGN KEY ("businessGroupId") REFERENCES "BusinessGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessGroup" ADD CONSTRAINT "BusinessGroup_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAssignment" ADD CONSTRAINT "EmployeeAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAssignment" ADD CONSTRAINT "EmployeeAssignment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAssignment" ADD CONSTRAINT "EmployeeAssignment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "BusinessService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteBusiness" ADD CONSTRAINT "FavoriteBusiness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteBusiness" ADD CONSTRAINT "FavoriteBusiness_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCategory" ADD CONSTRAINT "BusinessCategory_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCategory" ADD CONSTRAINT "BusinessCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleTemplate" ADD CONSTRAINT "ScheduleTemplate_businessGroupId_fkey" FOREIGN KEY ("businessGroupId") REFERENCES "BusinessGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaySchedule" ADD CONSTRAINT "DaySchedule_scheduleTemplateId_fkey" FOREIGN KEY ("scheduleTemplateId") REFERENCES "ScheduleTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeBlock" ADD CONSTRAINT "TimeBlock_dayScheduleId_fkey" FOREIGN KEY ("dayScheduleId") REFERENCES "DaySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeBlock" ADD CONSTRAINT "TimeBlock_overrideId_fkey" FOREIGN KEY ("overrideId") REFERENCES "Override"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverrideTemplate" ADD CONSTRAINT "OverrideTemplate_businessGroupId_fkey" FOREIGN KEY ("businessGroupId") REFERENCES "BusinessGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Override" ADD CONSTRAINT "Override_overrideTemplateId_fkey" FOREIGN KEY ("overrideTemplateId") REFERENCES "OverrideTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
