
import { readFileSync } from "fs";
import { join } from "path";
/**
 * 
 * @param {*} sku 
 * @returns object of sku and current stock value
 */
let getCurrentStock = (sku) => {
  return new Promise(async (resolve, reject) => {
    try {
      // read files on every invocation of function. 
      let skus = JSON.parse(readFileSync(join(__dirname, "../../files/stock.json"), 'utf8'));
      let transaction = JSON.parse(readFileSync(join(__dirname, "../../files/transactions.json"), 'utf8'));
      // filtering transaction against sku
      let tranArr = transaction.filter(tran => tran.sku === sku);
      // finding current sku stock
      let currentSku = skus.find(o => o.sku === sku);

      let qty = currentSku.stock || 0
      // adding or subtracting stock value on the basis of order or refund
      tranArr.map(item => {
        qty = item.type == "order" ? qty - item.qty : qty + item.qty
      })
      resolve({ sku, qty });
    } catch (error) {
      reject(error)
    }
  })
}
/**
 * A handler to return current stock value.
 */
export async function getCurrentStockValue(event) {
  let response = {
    statusCode: 500,
    body: {
      sku: null,
      currentStock: null
    }
  }
  try {

    if (event.httpMethod !== 'GET') {
      throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('Event received:', event);
    const sku_id = event.queryStringParameters.sku;
    if (!sku_id) {
      throw new Error(`Please provide sku in querystring parameteres`);
    }
    let stock = await getCurrentStock(sku_id)

    response.statusCode = 200;
    response.body.currentStock = stock.qty;
    response.body.sku = stock.sku

    // All log statements are written to CloudWatch
    console.info(`response statusCode: ${response.statusCode} body: ${JSON.stringify(response.body)}`);
    return response;


  } catch (error) {
    return response
  }
}