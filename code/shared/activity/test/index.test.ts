import * as activity from '../';

describe('Activity', () => {
  it('can log a safe message', async () => {
    expect(
      activity.write({
        context: 't',
        action: 't',
        message: 't',
        payload: {
          a: true,
          children: ['child'],
          child: {
            john: 'doe',
            email: 'hello@gmail.com',
          },
        },
        identifiers: {
          ip: '1.0.0.1',
        },
      })
    );
  });

  it('can truncate more than 24 characters for context/action', () => {
    expect(activity.sanitizeContextAction('a'.repeat(25))).toHaveLength(24);
  });

  it('can remove special characters for context/action', () => {
    expect(activity.sanitizeContextAction('&g#*$m(#@)a')).toBe('gma');
  });

  it('can mask an unsafe message', () => {
    expect(activity.sanitizeMessage('this is an email address of john@doe.com')).toBe(
      'this is an email address of ****@doe.com'
    );
  });

  it('can mask an unsafe 1 depth payload', () => {
    expect(
      activity.sanitizePayload({
        user_id: '123',
      })
    ).toHaveProperty('user_id', '***');
  });

  it('can mask an unsafe n depth payload', () => {
    expect(
      activity.sanitizePayload({
        children: {
          creditCard: '4000-0000-0000-0000',
        },
      }).children
    ).toHaveProperty('creditCard', '*******************');
  });

  it('can mask an unsafe n depth payload as an array', () => {
    expect(
      activity.sanitizePayload({
        children: [
          {
            email: 'asd@asd.com',
          },
        ],
      }).children[0]
    ).toHaveProperty('email', '***********');
  });
});
