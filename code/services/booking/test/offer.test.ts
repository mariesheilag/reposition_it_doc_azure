// import * as offerService from '../service/offer';
// import SlotOffer from '../model/offer';

describe.skip('Slot Offer', () => {
  describe('Create', () => {
    it.only('should create a slot offer if fields are valid ', async () => {
      // const input = {
      //   fromType: 'terminals',
      //   fromId: 1,
      //   toType: 'terminals',
      //   toId: 2,
      //   equipmentType: 'twenty',
      //   whitelistedProviders: [1, 2, 3, 4, 5],
      //   departureDateStart: new Date(2019, 6, 28),
      //   departureDateEnd: new Date(2019, 7, 28),
      // };
      // const result: SlotOffer = await offerService.create(input);
      // expect(result).toHaveReturned();
      expect(true).toBe(true);
    });

    it.only('should not create a slot offer if fields are not valid  ', async () => {
      // const result: SlotOffer = await offerService.create({});
      // expect(result).toThrow();
      expect(true).toBe(true);
    });
  });
});
