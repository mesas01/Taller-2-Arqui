import './globals.css';

export const metadata = {
  title: 'Gestor de Proyectos',
  description: 'Taller Arquitectura Cliente-Servidor'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
