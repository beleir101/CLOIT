-- CreateTable
CREATE TABLE "menu_items" (
    "menuId" TEXT NOT NULL,
    "menuName" VARCHAR(255) NOT NULL,
    "menuParentId" TEXT,
    "menuDepth" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("menuId")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_menuDepth_menuName_key" ON "menu_items"("menuDepth", "menuName");
