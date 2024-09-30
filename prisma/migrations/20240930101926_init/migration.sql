-- CreateTable
CREATE TABLE "LanguagesAndCurrencies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "currencyId" INTEGER NOT NULL,
    CONSTRAINT "LanguagesAndCurrencies_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "CurrencyEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurrencyEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "LanguagesAndCurrencies_currencyId_idx" ON "LanguagesAndCurrencies"("currencyId");
