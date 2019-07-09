import { AccessReferenceMap, MaskableEntity } from './accessreferencemap';
import { getIndirectReference, getDirectReference, mapIndirectAccessID, mapIndirectAccessIDs } from '.';

const originalId = 1;

const idType = 'type1';
describe('Insecure Object Access Prevention', () => {
  describe('access reference map data strcuture', () => {
    it('should be able to generate rid', async () => {
      const iam = new AccessReferenceMap();
      const rid = iam.addDirectReference(originalId);
      expect(rid).not.toEqual(originalId);
      expect(rid).toEqual(iam.getIndirectReference(originalId));
    });

    it('should be able to get the original id back from rid', async () => {
      const iam = new AccessReferenceMap();
      const rid = iam.addDirectReference(originalId);
      const derivedId = iam.getDirectReference(rid);
      expect(derivedId).toEqual(originalId);
    });

    it('should provide different rids from different instances', async () => {
      const iam1 = new AccessReferenceMap();
      const rid1 = iam1.addDirectReference(originalId);
      const iam2 = new AccessReferenceMap();
      const rid2 = iam2.addDirectReference(originalId);
      expect(rid1).not.toEqual(rid2);
    });
  });

  describe('access reference map service', () => {
    it('should be able to get the original id back from rid', async () => {
      const rid = await getIndirectReference(originalId, idType);
      const derivedId = await getDirectReference(rid, idType);
      expect(derivedId).toEqual(originalId);
    });

    it('should provide different rids for same id to different users', async () => {
      const rid1 = await getIndirectReference(originalId, idType, 1);
      const rid2 = await getIndirectReference(originalId, idType, 2);
      expect(rid1).not.toEqual(rid2);
    });

    it('should provide different rids for same id of different type', async () => {
      const rid1 = await getIndirectReference(originalId, idType);
      const rid2 = await getIndirectReference(originalId, 'type2');
      expect(rid1).not.toEqual(rid2);
    });

    it('should be able to map rid for single entity', async () => {
      const entity: MaskableEntity = {
        id: 1,
        rid: '',
      };
      await mapIndirectAccessID(entity, idType);
      expect(entity.rid).not.toEqual('');
    });

    it('should be able to map rids for multiple entities', async () => {
      const entity1: MaskableEntity = {
        id: 1,
        rid: '',
      };
      const entity2: MaskableEntity = {
        id: 2,
        rid: '',
      };
      await mapIndirectAccessIDs([entity1, entity2], idType);
      expect(entity1.rid).not.toEqual('');
      expect(entity2.rid).not.toEqual('');
    });
  });
});
