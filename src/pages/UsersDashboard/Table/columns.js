import { format, parseISO } from 'date-fns';

const COLUMNS = [
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    Header: 'Acceso',
    accessor: 'role',
  },
  // {
  //   Header: 'Descripción',
  //   accessor: 'notes',
  // },
  // {
  //   id: 'updatedAt',
  //   Header: 'Actualizado',
  //   accessor: (provider) => {
  //     if (provider.updatedAt) {
  //       const parsedDate = parseISO(provider.updatedAt);
  //       return format(parsedDate, 'dd/MM/yyyy');
  //     }
  //     return '';
  //   },
  // },
];

export default COLUMNS;
