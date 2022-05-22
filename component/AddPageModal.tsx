import {schema2component} from './AMISRenderer';

export default schema2component(
  {
    type: 'dialog',
    title: '新增页面',
    body: {
      type: 'form',
      controls: [
        {
          type: 'text',
          label: '名称',
          name: 'label',
          validations: {
            maxLength: 20
          },
          required: true
        },

        {
          type: 'text',
          label: '路径',
          name: 'path',
          validations: {
            isUrlPath: true
          },
          required: true,
          validate(values: any, value: string) {
            const exists = !!values.pages.filter(
              (item: any) => item.path === value
            ).length;
            return exists ? '当前路径已被占用，请换一个' : '';
          }
        },

        {
          type: 'icon-picker',
          label: '图标',
          name: 'icon'
        }
      ]
    }
  },
  ({onConfirm, pages, ...rest}: any) => {
    return {
      ...rest,
      data: {
        pages
      },
      onConfirm: (values: Array<any>) => onConfirm && onConfirm(values[0])
    };
  }
);
