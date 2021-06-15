import { format, parseISO } from 'date-fns';

const COLUMNS = (locale = 'pt-BR') => {
  const formater = Intl.NumberFormat(locale, { minimumFractionDigits: 1 });
  return [
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Slump',
      id: 'slump',
      width: 20,
      accessor: ({ slump }) => {
        if (slump) {
          return formater.format(slump);
        }
        return '';
      },
    },
    {
      Header: 'Descripción',
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
};

export default COLUMNS;
