import ApiResource from '../src/utils/ApiResource'

export default class DummyResource extends ApiResource {

  constructor() {
    super('dummy_api')
  }

  fetchGet(result) {
    return result.dummy_get;
  }

  fetchFind(result) {
    return result.dummy_find;
  }

  fetchCreate(result) {
    return result.dummy_create;
  }

  fetchStore(result) {
    return result.dummy_store;
  }

  fetchEdit(result) {
    return result.dummy_edit;
  }

  fetchUpdate(result) {
    return result.dummy_update;
  }

  fetchDestroy(result) {
    return result.dummy_destroy;
  }
}
