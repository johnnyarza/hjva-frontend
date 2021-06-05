const COLUMNS = [
  {
    Header: 'Material',
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
  {
    Header: 'Unidade',
    id: 'measure',
    width: 20,
    accessor: (concreteDesign) => {
      if (concreteDesign.material) {
        return `${concreteDesign.material.measurement.abbreviation}/m³`;
      }
      return '';
    },
  },
];

export default COLUMNS;
