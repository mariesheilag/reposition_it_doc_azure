import * as Authentication from '../service/authentication';
import faker from 'faker';

describe('Authentication', () => {
  describe('Keyring', () => {
    it('can get secret keys from the key ring', () => {
      process.env.JWT_SYNC_SECRET = 'a,b,c,d';
      const [key, id] = Authentication.getKeyFromKeyRing();
      expect(key).toBe('d');
      expect(id).toBe(3);
    });

    it('can add a new secret key to the key ring but keep the old key available', () => {
      process.env.JWT_SYNC_SECRET = 'a,b,c,d';
      let [key, id] = Authentication.getKeyFromKeyRing();
      expect(key).toBe('d');
      expect(id).toBe(3);
      process.env.JWT_SYNC_SECRET = 'a,b,c,d,e';
      [key, id] = Authentication.getKeyFromKeyRing();
      expect(key).toBe('e');
      expect(id).toBe(4);
    });

    it('validates an old key as usable', async () => {
      process.env.JWT_SYNC_SECRET = 'a,b,c,d';
      const [key, id] = Authentication.getKeyFromKeyRing();
      expect(key).toBe('d');
      expect(id).toBe(3);
      const hashed = await Authentication.signJwtFromKeyRing({ a: true });
      process.env.JWT_SYNC_SECRET = 'a,b,c,d,e';
      const hashed2 = await Authentication.signJwtFromKeyRing({ b: true });
      process.env.JWT_SYNC_SECRET = 'a,b,c,d,e,f';
      process.env.JWT_SYNC_SECRET = 'a,b,c,d,e,f,g';
      process.env.JWT_SYNC_SECRET = 'a,b,c,d,e,f,g,h';
      await expect(Authentication.verifyJwtFromKeyRing(hashed)).resolves.toHaveProperty('a', true);
      await expect(Authentication.verifyJwtFromKeyRing(hashed2)).resolves.toHaveProperty('b', true);
    });
  });

  describe('User', () => {
    it('can create a user by email', async () => {
      await expect(Authentication.createUserByEmail(faker.internet.email())).resolves.not.toBeNull();
    });

    it('can get a user by email', async () => {
      const email = faker.internet.email();
      const userId = await Authentication.createUserByEmail(email);
      await expect(Authentication.getUserIdByEmail(email)).resolves.toBe(userId);
    });

    it('throws an error when an email doesnt exist', async () => {
      await expect(Authentication.getUserIdByEmail('nosuch@email.net')).rejects.toThrowError('No user');
    });

    it('throws an error when an email already exists', async () => {
      const email = faker.internet.email();
      await Authentication.createUserByEmail(email);
      await expect(Authentication.createUserByEmail(email)).rejects.toThrowError('User exists');
    });
  });

  describe('OTP', () => {
    it('can create an OTP', async () => {
      await expect(Authentication.createOtp(1, 'a', '0.0.0.0')).resolves.not.toBeNull();
    });

    it('can check if OTP is valid', async () => {
      const token = await Authentication.createOtp(1, 'a', '0.0.0.0');
      await expect(Authentication.checkOtpAsValid(token)).resolves.toHaveProperty('user_id', 1);
    });

    it('can check if OTP is invalid', async () => {
      await expect(Authentication.checkOtpAsValid('fake OTP')).rejects.toThrowError('OTP is invalid');
    });

    it('can mark an OTP as used', async () => {
      const token = await Authentication.createOtp(2, 'b', '0.0.0.0');
      const otp = await Authentication.checkOtpAsValid(token);
      await Authentication.markOtpAsUsed(otp.id);
    });
  });

  describe('JWT', () => {
    it('can generate an access token', async () => {
      await expect(Authentication.generateAccess('a', 1)).resolves.toMatch(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      );
    });
  });

  describe('Login flow', () => {
    it('can start the login process', async () => {
      const email = faker.internet.email();
      await Authentication.createUserByEmail(email);
      await expect(Authentication.start(email, 'browser-fingerprint', '127.0.0.1')).resolves.toMatch(
        /^\$2[ayb]\$.{56}$/
      );
    });

    it('can continue the login process', async () => {
      const email = faker.internet.email();
      await Authentication.createUserByEmail(email);
      const token = await Authentication.start(email, 'browser-fingerprint', '127.0.0.1');
      // console.log(await Authentication.proceed(token, 'browser-fingerprint', '127.0.0.1'));
      // await expect(Authentication.proceed(token, 'browser-fingerprint', '127.0.0.1')).resolves.toHaveProperty(
      //   'accessToken',
      //   /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      // );
    });
  });
});
