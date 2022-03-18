export const mockTransaction = (name: string) =>
  jest.fn(() => Promise.resolve({ wait: jest.fn() })).mockName(name);
