import { test, expect } from "@playwright/test";
const fs = require("fs");
const data = require("../stores.json");

test("test", async ({ page }) => {
  const path = "storeData.json";

  const storeData = [];
  for (let i = 0; i < data.stores.length; i++) {
    await page.goto(
      `https://www.trendyol.com/magaza/profil/x-m-${data.stores[i].storeId}`
    );
    const store_score = await page.locator(".score-actual").innerText();
    const store_location = await page
      .locator(".seller-info-container__wrapper__text-container__value>>nth=1")
      .innerText();
    const store_productCount = await page
      .locator(".seller-info-container__wrapper__text-container__value>>nth=2")
      .innerText();
    const store_deliveryTimeToCargo = await page
      .locator(".seller-metrics-container__wrapper__value>>nth=0")
      .innerText();
    const store_questionAnswerRate = await page
      .locator(".seller-metrics-container__wrapper__value>>nth=1")
      .innerText();
    /*
  TODO: console.log(store_score); 
  */
    storeData.push({
      storeName: data.stores[i].storeName,
      storeId: data.stores[i].storeId,
      storeScore: store_score,
      storeLocation: store_location,
      storeProductCount: store_productCount,
      storeDeliveryTimeToCargo: store_deliveryTimeToCargo,
      storeQuestionAnswerRate: store_questionAnswerRate,
    });
  }
  const stringify = JSON.stringify(storeData);
  fs.writeFile(path, stringify, "utf8", (error) => {
    if (error) {
      console.log("An error has occurred ", error);
      return;
    }
    console.log("Data written successfully to disk");
  });
});
