const playwright = require("playwright");
const fs = require("fs");
const data = require("./stores.json");

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  const path = "storeData.json";

  const storeData = [];
  var i = 0;
  const len = data.stores.length;
  while (i < len) {
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
    i++;
  }
  const stringify = JSON.stringify(storeData);
  fs.writeFile(path, stringify, "utf8", (error) => {
    if (error) {
      console.log("An error has occurred ", error);
      return;
    }
    console.log("Data written successfully to disk");
  });
  await browser.close();
})();
