/* eslint-disable camelcase */
const COLUMNS = (locale = 'pt-BR') => {
  const formater = Intl.NumberFormat(locale, { minimumFractionDigits: 2 });
  return [
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
      id: 'quantity_per_m3',
      width: 20,
      accessor: ({ quantity_per_m3 }) => {
        if (quantity_per_m3) {
          return formater.format(quantity_per_m3);
        }
        return '';
      },
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
};

export default COLUMNS;
