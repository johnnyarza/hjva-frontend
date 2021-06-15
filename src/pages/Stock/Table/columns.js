import { format, parseISO } from 'date-fns';

const COLUMNS = (locale = 'pt-BR') => {
  const formater = Intl.NumberFormat(locale, { minimumFractionDigits: 2 });
  return [
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      id: 'category',
      Header: 'Categoria',
      accessor: (cat) => {
        return cat.category.name;
      },
    },
    {
      id: 'stockQty',
      Header: 'Saldo',
      width: 30,
      accessor: (material) => {
        const { stockQty } = material;
        if (stockQty) {
          return formater.format(stockQty);
        }
        return '';
      },
    },
    {
      id: 'measurement',
      Header: 'Unidad',
      width: 20,
      accessor: (u) => {
        if (u.measurement) {
          return u.measurement.abbreviation;
        }
        return '';
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
      Header: 'Observación',
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
};

export default COLUMNS;
