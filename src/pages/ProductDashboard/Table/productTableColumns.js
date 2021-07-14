import { format, parseISO } from 'date-fns';

const COLUMNS = (locale = 'pt-BR') => {
  const formater = Intl.NumberFormat(locale, { minimumFractionDigits: 2 });
  return [
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Descripción',
      accessor: 'description',
    },
    {
      Header: 'Categoria',
      accessor: 'category',
    },
    {
      Header: 'Precio',
      id: 'price',
      width: 20,
      accessor: ({ price }) => {
        if (price) {
          return formater.format(price);
        }
        return '';
      },
    },
    {
      id: 'updatedAt',
      Header: 'Actualizado',
      width: 20,
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
