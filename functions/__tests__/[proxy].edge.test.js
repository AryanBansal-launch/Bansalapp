/* eslint-disable no-console */
import handler from '../[proxy].edge.js';

// Mock console.log to avoid cluttering test output
const originalConsoleLog = console.log;
// Mock fetch for testing non-redirect scenarios
const originalFetch = global.fetch;

beforeEach(() => {
  console.log = jest.fn();
  global.fetch = jest.fn().mockResolvedValue(new Response('mocked response'));
});

afterEach(() => {
  console.log = originalConsoleLog;
  global.fetch = originalFetch;
});

describe('[proxy].edge.js handler', () => {
  let mockRequest;

  beforeEach(() => {
    // Reset mocks before each test
    mockRequest = {
      url: 'https://example.com/test-path'
    };
  });

  describe('Non-redirect scenarios', () => {
    test('should parse URL and log the host', async () => {
      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for example.com');
    });

    test('should call fetch() and return its result when no redirect needed', async () => {
      // Act
      const result = await handler(mockRequest);

      // Assert
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(mockRequest);
      expect(result).toBeInstanceOf(Response);
    });

    test('should handle URLs with query parameters', async () => {
      // Arrange
      mockRequest.url = 'https://api.example.com/api/data?param1=value1&param2=value2';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for api.example.com');
    });

    test('should handle URLs with fragments', async () => {
      // Arrange
      mockRequest.url = 'https://blog.example.com/page#section1';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for blog.example.com');
    });

    test('should handle root path', async () => {
      // Arrange
      mockRequest.url = 'https://www.example.com/';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for www.example.com');
    });

    test('should handle complex nested paths', async () => {
      // Arrange
      mockRequest.url = 'https://cdn.example.com/api/v1/users/123/profile';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for cdn.example.com');
    });

    test('should handle different domains', async () => {
      // Arrange
      mockRequest.url = 'https://api.different-domain.com/endpoint';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for api.different-domain.com');
    });

    test('should work with different protocols', async () => {
      // Arrange
      mockRequest.url = 'http://localhost:3000/dev-endpoint';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for localhost:3000');
    });

    test('should handle ports in host', async () => {
      // Arrange
      mockRequest.url = 'https://staging.example.com:8080/test';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for staging.example.com:8080');
    });

    test('should handle subdomains correctly', async () => {
      // Arrange
      mockRequest.url = 'https://app.api.example.com/v1/data';

      // Act
      await handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for app.api.example.com');
    });
  });

  describe('Redirect scenarios', () => {
    test('should redirect onestarrewards.com to www.cherokeecasino.com/rewards-program with 302', () => {
      // Arrange
      mockRequest.url = 'https://onestarrewards.com/some/path?query=value';

      // Act
      const result = handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for onestarrewards.com');
      expect(console.log).toHaveBeenCalledWith('Redirecting onestarrewards.com to www.cherokeecasino.com/rewards-program');
      expect(result).toBeInstanceOf(Response);
      expect(result.status).toBe(302);
      expect(result.headers.get('Location')).toBe('https://www.cherokeecasino.com/rewards-program');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('should redirect onestarrewards.com with different protocols', () => {
      // Arrange
      mockRequest.url = 'http://onestarrewards.com/login';

      // Act
      const result = handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for onestarrewards.com');
      expect(console.log).toHaveBeenCalledWith('Redirecting onestarrewards.com to www.cherokeecasino.com/rewards-program');
      expect(result).toBeInstanceOf(Response);
      expect(result.status).toBe(302);
      expect(result.headers.get('Location')).toBe('http://www.cherokeecasino.com/rewards-program');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('should redirect onestarrewards.com with port', () => {
      // Arrange
      mockRequest.url = 'https://onestarrewards.com:8080/api/test';

      // Act
      const result = handler(mockRequest);

      // Assert
      expect(console.log).toHaveBeenCalledWith('Received request for onestarrewards.com:8080');
      expect(console.log).toHaveBeenCalledWith('Redirecting onestarrewards.com:8080 to www.cherokeecasino.com/rewards-program');
      expect(result).toBeInstanceOf(Response);
      expect(result.status).toBe(302);
      expect(result.headers.get('Location')).toBe('https://www.cherokeecasino.com/rewards-program');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('should redirect to specific path regardless of original path', () => {
      // Arrange
      mockRequest.url = 'https://onestarrewards.com/old/path/that/gets/ignored?query=test';

      // Act
      const result = handler(mockRequest);

      // Assert
      expect(result.headers.get('Location')).toBe('https://www.cherokeecasino.com/rewards-program');
    });

    test('should handle onestarrewards.com with fragments', () => {
      // Arrange
      mockRequest.url = 'https://onestarrewards.com/page#section';

      // Act
      const result = handler(mockRequest);

      // Assert
      expect(result.headers.get('Location')).toBe('https://www.cherokeecasino.com/rewards-program');
    });
  });

  test('should handle edge function logic internally', async () => {
    // This test verifies the function structure and flow
    // Arrange
    const consoleSpy = jest.spyOn(console, 'log');

    // Act
    const result = await handler(mockRequest);

    // Assert - verify both the logging and the return value
    expect(consoleSpy).toHaveBeenCalledWith('Received request for example.com');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Response);
    
    consoleSpy.mockRestore();
  });
});
