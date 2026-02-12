const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-5 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h4 className="font-bold mb-4">AYUDA</h4>
          <ul className="space-y-2">
            <li><a href="#" className="footer-link">Preguntas Frecuentes</a></li>
            <li><a href="#" className="footer-link">Contacto</a></li>
            <li><a href="#" className="footer-link">Política de Privacidad</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">MANTENTE INFORMADO</h4>
          <ul className="space-y-2">
            <li><a href="#" className="footer-link">Sobre Nosotros</a></li>
            <li><a href="#" className="footer-link">Alquiler de Surf</a></li>
            <li><a href="#" className="footer-link">Clases de Surf</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">DIRECCIÓN Y CONTACTO</h4>
          <p>Wave Surf</p>
          <p>Calle Hola, Nº 3</p>
          <p>Benidorm, Alicante</p>
          <p>+34 693 237 819</p>
        </div>

        <div>
          <h4 className="font-bold mb-4">HORARIOS DE MAREA</h4>
          <table className="w-full text-left text-sm bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-1 px-2">Marea</th>
                <th className="py-1 px-2">Hora</th>
                <th className="py-1 px-2">Altura</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-600">
                <td className="py-1 px-2">Alta</td>
                <td className="py-1 px-2">05:07</td>
                <td className="py-1 px-2">6.2m</td>
              </tr>
              <tr>
                <td className="py-1 px-2">Baja</td>
                <td className="py-1 px-2">11:31</td>
                <td className="py-1 px-2">1.3m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center mt-12 text-gray-400 text-sm">
        © 2026 Wave Club | All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer;