import { format, parseISO } from 'date-fns';

const COLUMNS = [
  {
    Header: 'Nombre',
    id: 'name',
    accessor: (concreteDesign) => {
      if (concreteDesign.material.name) {
        return concreteDesign.material.name;
      }
      return '';
    },
  },
  {
    Header: 'Cantidad',
    accessor: 'quantity_per_m3',
    width: 20,
  },
];

export default COLUMNS;
