import { parseISO, format } from 'date-fns';

const COLUMNS = (locale = 'pt-BR') => {
  const formater = Intl.NumberFormat(locale, { minimumFractionDigits: 2 });
  return [
    {
      Header: 'Material',
      id: 'material',
      width: 30,
      accessor: ({ material }) => {
        if (material) {
          return material.name;
        }
        return '';
      },
    },
    {
      Header: 'Categoria',
      id: 'category',
      width: 20,
      accessor: ({ material }) => {
        if (material) {
          return material.category.name;
        }
        return '';
      },
    },
    {
      Header: 'Cant. Anterior',
      id: 'previousQty',
      width: 20,
      accessor: ({ previousQty }) => {
        if (previousQty) {
          return formater.format(previousQty);
        }
        return '';
      },
    },
    {
      Header: 'Cantidad',
      id: 'entry',
      width: 20,
      accessor: ({ entry }) => {
        if (entry) {
          return formater.format(entry);
        }
        return '';
      },
    },
    {
      Header: 'Cant. Actual',
      id: 'stockQty',
      width: 20,
      accessor: ({ entry, previousQty }) => {
        if (entry && previousQty) {
          return formater.format(Number(entry) + Number(previousQty));
        }
        return '';
      },
    },
    {
      Header: 'Unidad',
      id: 'unidad',
      width: 15,
      accessor: ({ material }) => {
        if (material) {
          return material.measurement.abbreviation;
        }
        return '';
      },
    },
    {
      Header: 'Descripción',
      id: 'notes',
      width: 20,
    },
    {
      Header: 'Persona',
      id: 'person',
      width: 15,
      accessor: ({ client, provider }) => {
        if (client) {
          return `Salida: ${client.name}`;
        }
        if (provider) {
          return `Entrada: ${provider.name}`;
        }
        return '';
      },
    },
    {
      id: 'createdAt',
      Header: 'Fecha',
      width: 20,
      accessor: (provider) => {
        if (provider.createdAt) {
          const parsedDate = parseISO(provider.createdAt);
          return format(parsedDate, 'dd/MM/yyyy HH:mm');
        }
        return '';
      },
    },
  ];
};

export default COLUMNS;
