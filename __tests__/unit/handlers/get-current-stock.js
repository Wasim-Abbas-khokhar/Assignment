// Import all functions from get-current-stock.js 
import { getCurrentStockValue } from '../../../src/handlers/get-current-stock.js'; 
 
describe('Test getCurrentStock', () => { 
    // let getSpy; 
    // beforeAll(() => { 
        
    // }); 
 
    // // Clean up mocks 
    // afterAll(() => { 
    // }); 
  
    it('should get item by skus', async () => { 
       
        const event = {
            httpMethod: "GET",
            queryStringParameters:{
                "sku": "HPX415896/42/97"
            }
        } 
 
        // Invoke getByIdHandler() 
        const result = await getCurrentStockValue(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body:  {
                sku: "HPX415896/42/97",
                currentStock: 9377
              } 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 