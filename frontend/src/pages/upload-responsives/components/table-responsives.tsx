interface Responsive {
  entrega: string
  recibe: string
  aprueba: string
  dispositivo: string
  numero_de_serie: number
  marca: string
  ubicacion: string
  caracteristicas: string
}


interface Props {
  data: Responsive[]
}


export const TableResponsives = ({ data }: Props) => {
  return <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Entrega</th>
          <th scope="col" className="px-6 py-3">Recibe</th>
          <th scope="col" className="px-6 py-3">Aprueba</th>
          <th scope="col" className="px-6 py-3">Dispositivo</th>
          <th scope="col" className="px-6 py-3">Número de serie</th>
          <th scope="col" className="px-6 py-3">Marca</th>
          <th scope="col" className="px-6 py-3">Ubicación</th>
          <th scope="col" className="px-6 py-3">Caracteristicas</th>
        </tr>
      </thead>
      <tbody>
        {data.map((responsive, i) => (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          key={responsive.entrega + i}
        >
        <td scope="row"  className="px-6 py-4">
            {responsive.entrega}
          </td>
          <td className="px-6 py-4">
            {responsive.recibe}
          </td>
          <td className="px-6 py-4">
            {responsive.aprueba}
          </td>
          <td className="px-6 py-4">
            {responsive.dispositivo}
          </td>
          <td className="px-6 py-4">
            {responsive.numero_de_serie}
          </td>
          <td className="px-6 py-4">
            {responsive.marca}
          </td>
          <td className="px-6 py-4">
            {responsive.ubicacion}
          </td>
          <td className="px-6 py-4">
            {responsive.caracteristicas}
          </td>
        </tr>))}
      </tbody>
    </table>
  </div>

}
