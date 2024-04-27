-- AddForeignKey
ALTER TABLE "RulesParameter" ADD CONSTRAINT "RulesParameter_rulesName_fkey" FOREIGN KEY ("rulesName") REFERENCES "Rules"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
