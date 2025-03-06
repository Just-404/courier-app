-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PROVEEDOR', 'TRANSPORTISTA', 'DISTRIBUIDOR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DISTRIBUIDOR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
