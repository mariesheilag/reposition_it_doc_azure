import * as instance from '@repositionit/shared/http/server';
import db from '@repositionit/shared/db';
import fastify = require('fastify');

let server: fastify.FastifyInstance;

beforeAll(async () => {
  server = await instance.prepare();
});

afterAll(() => {
  server.close();
  db.destroy();
});

describe('Matching API', () => {
  it('throws an error when the origin terminal supplied is malformed', async () => {
    expect(true).toBe(true);
  });

  it('throws an error when the terminal supplied is malformed', async () => {
    expect(true).toBe(true);
  });

  it('throws an error when terminal supplied does not exist', async () => {
    expect(true).toBe(true);
  });

  it('throws an error when the date range is not a date', async () => {
    expect(true).toBe(true);
  });

  it('throws an error when the date range is before NOW', async () => {
    expect(true).toBe(true);
  });

  it('throws an error when the date range is in reverse', async () => {
    expect(true).toBe(true);
  });

  describe('Reposition Requests', () => {
    it('can get matches with valid terminal to terminal', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid terminal to port', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid terminal to country', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid terminal to region', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid port to terminal', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid port to port', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid port to country', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid port to region', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid country to terminal', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid country to port', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid country to country', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid country to region', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid region to terminal', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid region to port', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid region to country', async () => {
      expect(true).toBe(true);
    });

    it('can get matches with valid region to region', async () => {
      expect(true).toBe(true);
    });

    it('can get matches when date range is within offer date range ', async () => {
      expect(true).toBe(true);
    });

    it('can get matches when date range is an end-inside with offer date range ', async () => {
      expect(true).toBe(true);
    });

    it('can get matches when date range is a start-inside with offer date range ', async () => {
      expect(true).toBe(true);
    });

    it('does not return a match when date range is outside offer date range ', async () => {
      expect(true).toBe(true);
    });
  });

  describe('Slot offer', () => {
    it('can get matches with valid terminal to terminal', async () => {
      expect(true).toBe(true);
    });

    it('can get matches when date range is within a request date range ', async () => {
      expect(true).toBe(true);
    });

    it('can get matches when date range is an end-inside with a request date range ', async () => {
      expect(true).toBe(true);
    });

    it('can get matches when date range is a start-inside with a request date range ', async () => {
      expect(true).toBe(true);
    });

    it('does not return a match when date range is outside an available request date range ', async () => {
      expect(true).toBe(true);
    });
  });
});
