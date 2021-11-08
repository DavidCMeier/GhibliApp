import { Params } from '@angular/router';
import { CustomSerializer, RouterStateUrl } from '../router.reducer';

interface MockActiveStateSnapshot {
  queryParams?: Params;
  params?: Params;
  firstChild: MockActiveStateSnapshot | null;
}

interface MockRouterStateSnapshot {
  url: string;
  root: MockActiveStateSnapshot;
}

describe('CustomSerializer', () => {
  let serializer: CustomSerializer;

  beforeEach(() => {
    serializer = new CustomSerializer();
  });

  describe('serialize', () => {
    it('should return only URL', () => {
      const expected: RouterStateUrl = {
        url: 'test-url',
        queryParams: {},
        params: {},
      };
      const input: MockRouterStateSnapshot = {
        url: 'test-url',
        root: {
          queryParams: {},
          firstChild: {
            firstChild: null,
            params: {},
          }
        }
      };

      expect(serializer.serialize(input as any)).toEqual(expected);
    });

    it('should return route and query params', () => {
      const expected: RouterStateUrl = {
        url: 'test-url',
        queryParams: {
          param1: 'val1',
          param2: 'val2'
        },
        params: {
          param1: 'val1',
          param2: 'val2'
        },
      };
      const input: MockRouterStateSnapshot = {
        url: 'test-url',
        root: {
          queryParams: {
            param1: 'val1',
            param2: 'val2'
          },
          firstChild: {
            firstChild: {
              firstChild: {
                firstChild: null,
                params: {
                  param1: 'val1',
                  param2: 'val2'
                },
              }
            }
          }
        }
      };

      expect(serializer.serialize(input as any)).toEqual(expected);
    });

    it('should return the params recursively', () => {
      const expected: RouterStateUrl = {
        url: 'test-url',
        queryParams: {},
        params: {
          param1: 'val1',
          param2: 'val2',
          param3: 'val3',
          param4: 'val4',
          param5: 'val5'
        }
      };
      const input: MockRouterStateSnapshot = {
        url: 'test-url',
        root: {
          queryParams: {},
          params: {
            param1: 'val1',
            param2: 'val2'
          },
          firstChild: {
            params: {
              param3: 'val3'
            },
            firstChild: {
              params: {
                param4: 'val4'
              },
              firstChild: {
                params: {
                  param5: 'val5'
                },
                firstChild: null,
              }
            }
          }
        }
      };

      expect(serializer.serialize(input as any)).toEqual(expected);
    });
  });
});
