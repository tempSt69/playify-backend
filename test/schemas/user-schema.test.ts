import { loginSchema, signupSchema } from '../../src/schemas/user-schema';

describe('USER: Zod schemas validator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('loginSchema, should work', () => {
    const inputData = {
      body: {
        email: 'antoine@test.gg',
        hash: '12345678',
      },
    };
    const result = loginSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('loginSchema, should fail', () => {
    const inputData = {
      body: {
        email: 'antoinetest.gg',
        hash: '1234567',
      },
    };
    const result = loginSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });

  test('signupSchema, should work', () => {
    const inputData = {
      body: {
        email: 'antoine@test.gg',
        hash: '12345678',
      },
    };
    const result = signupSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
  });

  test('updateSong, should fail', () => {
    const inputData = {
      body: {
        email: 'antoinetest.gg',
        hash: '1234567',
      },
    };
    const result = signupSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
  });
});
