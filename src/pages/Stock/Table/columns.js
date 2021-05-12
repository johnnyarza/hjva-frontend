import { format, parseISO } from 'date-fns';

const COLUMNS = [
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    id: 'provider',
    Header: 'Proveedor.',
    accessor: (material) => {
      return material.provider.name;
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
      if (provider.updatedAt) {
        const parsedDate = parseISO(provider.updatedAt);
        return format(parsedDate, 'dd/MM/yyyy');
      }
      return '';
    },
  },
];

export default COLUMNS;
