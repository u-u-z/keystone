import {
  ArrayField,
  ComponentSchemaForGraphQL,
  fields,
} from '@keystone-6/fields-document/component-blocks';
import { componentThing, components } from './components-field';

export const schema: ArrayField<ComponentSchemaForGraphQL> = components({
  leaf: componentThing({
    label: 'Leaf',
    field: fields.object({
      label: fields.text({ label: 'Label' }),
      url: fields.url({ label: 'URL' }),
    }),
    subtitle: props => props.fields.label.value,
  }),
  group: componentThing({
    label: 'Group',
    field: fields.object({
      label: fields.text({ label: 'Label' }),
      get children() {
        return schema;
      },
    }),
    subtitle: props =>
      `${props.fields.label.value ? props.fields.label.value + ' — ' : ''}${
        props.fields.children.elements.length
      } Items`,
    children: props => props.fields.children,
  }),
});
