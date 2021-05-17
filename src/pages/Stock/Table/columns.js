import { format, parseISO } from 'date-fns';

const COLUMNS = [
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    id: 'measurement',
    Header: 'Unidad',
    width: 20,
    accessor: (u) => {
      return u.measurement.abbreviation;
    },
  },
  {
    id: 'provider',
    Header: 'Proveedor',
    accessor: (material) => {
      return material.provider.name;
    },
  },
  {
    id: 'category',
    Header: 'Categoria',
    accessor: (cat) => {
      return cat.category.name;
    },
  },
  {
    Header: 'Detalhes',
    accessor: 'notes',
  },
  {
    id: 'updatedAt',
    Header: 'Actualizado',
    accessor: (provider) => {
      if (provider.updated_at) {
        const parsedDate = parseISO(provider.updated_at);
        return format(parsedDate, 'dd/MM/yyyy');
      }
      return '';
    },
  },
];

export default COLUMNS;
