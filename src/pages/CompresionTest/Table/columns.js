import { format, parseISO } from 'date-fns';

const COLUMNS = (locale = 'pt-BR') => {
  const formater = Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
  });
  return [
    {
      Header: 'Doc. Nª',
      accessor: 'tracker',
      width: 20,
    },
    {
      Header: 'Cliente',
      id: 'client',
      accessor: ({ client }) => {
        if (client.name) {
          return client.name;
        }
        return '';
      },
    },
    {
      Header: 'Prov. Hormigón',
      id: 'concreteProvider',
      accessor: ({ concreteProvider }) => {
        if (concreteProvider.name) {
          return concreteProvider.name;
        }
        return '';
      },
    },
    {
      Header: 'Dosificación',
      columns: [
        {
          Header: 'Nombre',
          id: 'concreteDesignName',
          accessor: ({ concreteDesign }) => {
            if (concreteDesign) {
              return concreteDesign.name;
            }
            return '';
          },
        },
        {
          Header: 'Slump',
          id: 'concreteDesignSlump',
          accessor: ({ concreteDesign }) => {
            if (concreteDesign) {
              return `${formater.format(concreteDesign.slump)} cm`;
            }
            return '';
          },
          width: 20,
        },
        {
          Header: 'Descripcion',
          id: 'concreteDesignNotes',
          accessor: ({ concreteDesign }) => {
            if (concreteDesign) {
              return concreteDesign.notes;
            }
            return '';
          },
        },
      ],
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
      width: 30,
    },
  ];
};

export default COLUMNS;
