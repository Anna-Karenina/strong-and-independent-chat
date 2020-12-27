import {HTTPTransport, METHODS} from '../index.js';

const mockOpen = jest.fn((method: METHODS, path: string) => ({method, path}));

const mockSend = jest.fn((data: any) => data);

const mockSetRequestHeader = jest.fn((key: string, value: string) => ({key, value}));

const mockFetch = (status: number, data?: { [key: string]: string }) => {
  const xhrMockObj = {
    open: mockOpen,
    send: mockSend,
    setRequestHeader: mockSetRequestHeader,
    readyState: 4,
    status,
    response: data,
  };

  const xhrMockClass = () => xhrMockObj;

  // @ts-ignore
  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

  setTimeout(() => {
    // @ts-ignore
    xhrMockObj['onload']();
  }, 0);
};

const http = (rootPath: string) => new HTTPTransport(rootPath);
const getLastMockResult = (mockFn: any) => mockFn.mock.results[mockFn.mock.results.length - 1];

describe('HTTPTransport', () => {
  describe('GET', () => {
    test('request open with method GET', async () => {
      mockFetch(200);
      await http('').get('mock');

      expect(getLastMockResult(mockOpen).value.method).toEqual(METHODS.GET);
    });

    test('resolve data with status 200', async () => {
      const response = {title: 'Chat name'};
      mockFetch(200, response);
  
      const result = await http('').get('mock');
      expect(result).toEqual(response);
    });

    test('reject error with status 400', async () => {
      const errorFromRequest = {reason: 'not reason :)'};
      mockFetch(400, errorFromRequest);

      expect.assertions(1);
      try {
        await http('').get('mock');
      } catch (error) {
        expect(error).toEqual(errorFromRequest);
      }
    });

    test('query params parsing correctly', async () => {
      const queryData = {
        key: 1,
        key2: 'test',
        key3: false,
        key4: true,
        key5: [1, 2, 3],
        key6: {a: 1},
        key7: {b: {d: 2}},
      };
      const queryStringify = '?key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2';
      const path = '/mock'

      mockFetch(200);
      await http('').get(path, {data: queryData});
      
      expect(getLastMockResult(mockOpen).value.path).toEqual(path + queryStringify);
    });
  });

  describe('POST', () => {
    test('request open with method POST', async () => {
      mockFetch(200);
      await http('').post('mock');

      expect(getLastMockResult(mockOpen).value.method).toEqual(METHODS.POST);
    });

    test('resolve data with status 200', async () => {
      const response = {title: 'Chat name'};
      mockFetch(200, response);
  
      const result = await http('').post('mock');
      expect(result).toEqual(response);
    });

    test('reject error with status 400', async () => {
      const errorFromRequest = {reason: 'not reason :)'};
      mockFetch(400, errorFromRequest);

      expect.assertions(1);
      try {
        await http('').post('mock');
      } catch (error) {
        expect(error).toEqual(errorFromRequest);
      }
    });

    test('json stringify payload', async () => {
      const data = {name: 'Bob'};
      mockFetch(200);
      await http('').post('mock', {data});

      expect(getLastMockResult(mockSend).value).toEqual(JSON.stringify(data));
    });
  });

  describe('PUT', () => {
    test('request open with method PUT', async () => {
      mockFetch(200);
      await http('').put('mock');

      expect(getLastMockResult(mockOpen).value.method).toEqual(METHODS.PUT);
    });

    test('resolve data with status 200', async () => {
      const response = {title: 'Chat name'};
      mockFetch(200, response);
  
      const result = await http('').put('mock');
      expect(result).toEqual(response);
    });

    test('reject error with status 400', async () => {
      const errorFromRequest = {reason: 'not reason :)'};
      mockFetch(400, errorFromRequest);

      expect.assertions(1);
      try {
        await http('').put('mock');
      } catch (error) {
        expect(error).toEqual(errorFromRequest);
      }
    });

    test('json stringify payload', async () => {
      const data = {name: 'Bob'};
      mockFetch(200);
      await http('').put('mock', {data});

      expect(getLastMockResult(mockSend).value).toEqual(JSON.stringify(data));
    });
  });

  describe('DELETE', () => {
    test('request open with method DELETE', async () => {
      mockFetch(200);
      await http('').delete('mock');

      expect(getLastMockResult(mockOpen).value.method).toEqual(METHODS.DELETE);
    });

    test('resolve data with status 200', async () => {
      const response = {title: 'Chat name'};
      mockFetch(200, response);
  
      const result = await http('').delete('mock');
      expect(result).toEqual(response);
    });

    test('reject error with status 400', async () => {
      const errorFromRequest = {reason: 'not reason :)'};
      mockFetch(400, errorFromRequest);

      expect.assertions(1);
      try {
        await http('').delete('mock');
      } catch (error) {
        expect(error).toEqual(errorFromRequest);
      }
    });

    test('json stringify payload', async () => {
      const data = {name: 'Bob'};
      mockFetch(200);
      await http('').delete('mock', {data});

      expect(getLastMockResult(mockSend).value).toEqual(JSON.stringify(data));
    });
  });

  describe('common', () => {
    test('root path', () => {
      const path = 'test/root/path';
      expect(http(path).root).toEqual(path);
    });

    test('headers sets correctly', async () => {
      const headers = {
        'Header 1': 'Value 1',
        'Header 2': 'Value 2',
      };
      mockFetch(200);
      await http('').post('mock', {headers})

      const lastCallIdx = mockSetRequestHeader.mock.calls.length - 1;
      expect(mockSetRequestHeader.mock.calls[lastCallIdx - 1]).toEqual([
        'Header 1',
        'Value 1',
      ]);
      expect(mockSetRequestHeader.mock.calls[lastCallIdx]).toEqual([
        'Header 2',
        'Value 2',
      ]);
    });
  });
});