import DummyResource from './DummyResource'
import MockAdapter from 'axios-mock-adapter'
import Base from '../src/base'

describe('ApiResource methods', () => {

  Base.httpEndpoint('$http', {
    baseUrl: 'http://example.com/',
  })

  function FormDataMock() {
    this.append = jest.fn();
  }
  global.FormData = FormDataMock

  let axiosMock = new MockAdapter(Base.endpoints.$http)
  let mockResult = {
    get: { dummy_get: [] },
    find: { dummy_find: {} },
    create: { dummy_create: {} },
    store: { dummy_store: {} },
    edit: { dummy_edit: {} },
    update: { dummy_update: {} },
    destroy: { dummy_destroy: {} },
  }
  let testArgs = {
    get: [],
    find: [1],
    create: [],
    store: [{}],
    edit: [1],
    update: [1, {}],
    destroy: [1],
  }

  axiosMock.onGet(/dummy_api$/).reply(200, mockResult.get)
  axiosMock.onGet(/dummy_api\/\d+$/).reply(200, mockResult.find)
  axiosMock.onGet(/dummy_api\/create$/).reply(200, mockResult.create)
  axiosMock.onPost(/dummy_api$/).reply(201, mockResult.store)
  axiosMock.onGet(/dummy_api\/\d+\/edit$/).reply(200, mockResult.edit)
  axiosMock.onPut(/dummy_api\/\d+$/).reply(202, mockResult.update)
  axiosMock.onDelete(/dummy_api\/\d+$/).reply(202, mockResult.destroy)

  let instance = new DummyResource()

  test('resource classes uses $http endpoint by default', () => {
    expect(instance.httpEndpoint).toBe('$http')
  })

  let methods = ['get', 'find', 'create', 'store', 'edit', 'update', 'destroy']
  methods.forEach(method => {
    test(`returns WHOLE data for ${method}()`, () => {
      expect.assertions(1)
      return instance[method](...testArgs[method]).then(result => {
        expect(result).toStrictEqual(mockResult[method])
      })
    })
    test(`returns FETCH data for $${method}()`, () => {
      expect.assertions(1)
      return instance['$' + method](...testArgs[method]).then(result => {
        expect(result).toStrictEqual(mockResult[method]['dummy_' + method])
      })
    })
  })

  test('withResponse() returns response itself', () => {
    expect.assertions(2)
    return instance.withResponse().get().then(result => {
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(mockResult.get)
    })
  })

})
