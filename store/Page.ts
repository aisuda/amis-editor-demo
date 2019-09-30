import {types, getEnv} from 'mobx-state-tree';
export const PageStore = types
    .model('Page', {
        id: types.identifier,
        icon: '',
        path: '',
        label: '',
        schema: types.frozen({})
    })
    .views(self => ({}))
    .actions(self => {
        function updateSchema(schema: any) {
            self.schema = schema;
        }

        return {
            updateSchema
        };
    });

export type IPageStore = typeof PageStore.Type;
