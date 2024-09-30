-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "rate" REAL NOT NULL,
    CONSTRAINT "ExchangeRate_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "CurrencyEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExchangeRate_toId_fkey" FOREIGN KEY ("toId") REFERENCES "CurrencyEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ExchangeRate_fromId_idx" ON "ExchangeRate"("fromId");

-- CreateIndex
CREATE INDEX "ExchangeRate_toId_idx" ON "ExchangeRate"("toId");
