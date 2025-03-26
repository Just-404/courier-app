-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_transporter_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "transporter_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_transporter_id_fkey" FOREIGN KEY ("transporter_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
