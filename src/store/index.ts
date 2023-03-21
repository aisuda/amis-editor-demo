import {types, getEnv, applySnapshot, getSnapshot} from 'mobx-state-tree';
import {PageStore} from './Page';
import {when, reaction} from 'mobx';
let pagIndex = 1;
export const MainStore = types
  .model('MainStore', {
    pages: types.optional(types.array(PageStore), [
      {
        id: `${pagIndex}`,
        path: 'hello-world',
        label: 'Hello world',
        icon: 'fa fa-file',
        schema: {
          type: 'page',
          title: 'Hello world',
          body: '初始页面'
        }
      }
    ]),
    theme: 'cxd',
    asideFixed: true,
    asideFolded: false,
    offScreen: false,
    addPageIsOpen: false,
    preview: false,
    isMobile: false,
    schema: types.frozen()
  })
  .views(self => ({
    get fetcher() {
      return getEnv(self).fetcher;
    },
    get notify() {
      return getEnv(self).notify;
    },
    get alert() {
      return getEnv(self).alert;
    },
    get copy() {
      return getEnv(self).copy;
    }
  }))
  .actions(self => {
    function toggleAsideFolded() {
      self.asideFolded = !self.asideFolded;
    }

    function toggleAsideFixed() {
      self.asideFixed = !self.asideFixed;
    }

    function toggleOffScreen() {
      self.offScreen = !self.offScreen;
    }

    function setAddPageIsOpen(isOpened: boolean) {
      self.addPageIsOpen = isOpened;
    }

    function addPage(data: {
      label: string;
      path: string;
      icon?: string;
      schema?: any;
    }) {
      self.pages.push(
        PageStore.create({
          ...data,
          id: `${++pagIndex}`
        })
      );
    }

    function removePageAt(index: number) {
      self.pages.splice(index, 1);
    }

    function updatePageSchemaAt(index: number) {
      self.pages[index].updateSchema(self.schema);
    }

    function updateSchema(value: any) {
      self.schema = value;
    }

    function setPreview(value: boolean) {
      self.preview = value;
    }

    function setIsMobile(value: boolean) {
      self.isMobile = value;
    }

    return {
      toggleAsideFolded,
      toggleAsideFixed,
      toggleOffScreen,
      setAddPageIsOpen,
      addPage,
      removePageAt,
      updatePageSchemaAt,
      updateSchema,
      setPreview,
      setIsMobile,
      afterCreate() {
        // persist store
        if (typeof window !== 'undefined' && window.localStorage) {
          const storeData = window.localStorage.getItem('store');
          if (storeData) applySnapshot(self, JSON.parse(storeData));

          reaction(
            () => getSnapshot(self),
            json => {
              window.localStorage.setItem('store', JSON.stringify(json));
            }
          );
        }
      }
    };
  });

export type IMainStore = typeof MainStore.Type;
