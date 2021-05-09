import { format, parseISO } from 'date-fns';

const COLUMNS = [
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    Header: 'Tel.',
    accessor: 'phone',
  },
  {
    Header: 'Correo E.',
    accessor: 'email',
  },
  {
    Header: 'Ubicación',
    accessor: 'address',
  },
  {
    id: 'updatedAt',
    Header: 'Actualizado',
    accessor: (client) => {
      const parsedDate = parseISO(client.updatedAt);
      return format(parsedDate, 'dd/MM/yyyy');
    },
  },
];

export default COLUMNS;
