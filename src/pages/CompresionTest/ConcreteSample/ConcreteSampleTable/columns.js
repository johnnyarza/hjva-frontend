import { format } from 'date-fns';

const COLUMNS = (locale = 'pt-BR') => {
  const formater = Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
  });
  return [
    {
      Header: 'Prob. Nª',
      accessor: 'tracker',
      width: 20,
    },
    {
      Header: 'Descripcion',
      accessor: 'notes',
    },
    {
      Header: 'Slump (cm)',
      id: 'slump',
      accessor: ({ slump }) => {
        if (slump) {
          return formater.format(slump);
        }
        return '';
      },
    },
    {
      id: 'sampledAt',
      Header: 'Moldeo',
      accessor: (concreteSample) => {
        if (concreteSample.sampledAt) {
          return format(concreteSample.sampledAt, 'dd/MM/yyyy');
        }
        return '';
      },
      width: 30,
    },
    {
      id: 'loadedAt',
      Header: 'Rotura',
      accessor: (concreteSample) => {
        if (concreteSample.loadedAt) {
          return format(concreteSample.loadedAt, 'dd/MM/yyyy');
        }
        return '';
      },
      width: 30,
    },
    {
      Header: 'Dias',
      accessor: 'days',
      width: 15,
    },
    {
      Header: 'ø (cm)',
      id: 'diameter',
      width: 15,
      accessor: ({ diameter }) => {
        if (diameter) {
          return formater.format(diameter);
        }
        return '';
      },
    },
    {
      Header: 'Altura (cm)',
      id: 'height',
      width: 25,
      accessor: ({ height }) => {
        if (height) {
          return formater.format(height);
        }
        return '';
      },
    },
    {
      Header: 'Peso (kg)',
      id: 'weight',
      width: 15,
      accessor: ({ weight }) => {
        if (weight) {
          return formater.format(weight);
        }
        return '';
      },
    },
    {
      Header: 'Rotura (ton)',
      id: 'load',
      width: 25,
      accessor: ({ load }) => {
        if (load) {
          return formater.format(load);
        }
        return '';
      },
    },
  ];
};

export default COLUMNS;

/**
 * {
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
            return `${concreteDesign.slump} cm`;
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
 */
