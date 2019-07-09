import crypto from 'crypto';

export interface MaskableEntity {
  id: number;
  rid: string;
}

export class AccessReferenceMap {
  private directToIndirectMap: Map<number, string>;
  private indirectToDirectMap: Map<string, number>;

  constructor() {
    this.directToIndirectMap = new Map();
    this.indirectToDirectMap = new Map();
  }

  private getUniqueReference = (directReference: number): string => {
    return crypto.randomBytes(16).toString('hex');
  };

  public addDirectReference = (directReference: number): string => {
    const indirectReference: string = this.getUniqueReference(directReference);
    this.indirectToDirectMap.set(indirectReference, directReference);
    this.directToIndirectMap.set(directReference, indirectReference);
    return indirectReference;
  };

  public getDirectReference = (indirectReference: string): number => {
    return this.indirectToDirectMap.get(indirectReference)!;
  };

  public getIndirectReference = (directReference: number): string => {
    return this.directToIndirectMap.get(directReference)!;
  };
}
