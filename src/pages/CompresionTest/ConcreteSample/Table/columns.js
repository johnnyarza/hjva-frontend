import { format, parseISO } from 'date-fns';

const COLUMNS = [
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
    accessor: 'slump',
  },
  {
    id: 'sampledAt',
    Header: 'Moldeo',
    accessor: (concreteSample) => {
      if (concreteSample.sampledAt) {
        const parsedDate = parseISO(concreteSample.sampledAt);
        return format(parsedDate, 'dd/MM/yyyy');
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
        const parsedDate = parseISO(concreteSample.loadedAt);
        return format(parsedDate, 'dd/MM/yyyy');
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
    accessor: 'diameter',
    width: 15,
  },
  {
    Header: 'Altura (cm)',
    accessor: 'height',
    width: 25,
  },
  {
    Header: 'Peso (kg)',
    accessor: 'weight',
    width: 15,
  },
  {
    Header: 'Rotura (ton)',
    accessor: 'load',
    width: 25,
  },
];

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
