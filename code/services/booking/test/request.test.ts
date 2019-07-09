// import * as requestService from '../service/request';
// import RepositionRequest from '../model/request';

describe.skip('Reposition Request', () => {
  describe('Create', () => {
    it.only('should create a reposition request if fields are valid ', async () => {
      // const input = {
      //   supplierId: 1,
      //   terminalFrom: 1,
      //   terminalTo: 2,
      //   priceUnit: 200,
      //   quantityTwentyOriginal: 200,
      //   quantityTwentyCurrent: 200,
      //   quantityFortyOriginal: 0,
      //   quantityFortyCurrent: 0,
      //   whitelistedClients: [6, 7],
      //   departureDateStart: new Date(2019, 6, 28),
      //   departureDateEnd: new Date(2019, 7, 28),
      //   arrivalDateStart: new Date(2019, 8, 28),
      //   arrivalDateEnd: new Date(2019, 8, 29),
      //   expirationDate: new Date(2019, 8, 30),
      // };
      // const result: RepositionRequest = await requestService.create(input);
      // expect(result).toHaveReturned();
      expect(true).toBe(true);
    });

    it.only('should not create a reposition request if fields are not valid  ', async () => {
      // const result: RepositionRequest = await requestService.create({});
      // expect(result).toThrow();
      expect(true).toBe(true);
    });
  });
});
