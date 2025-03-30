export const htmlContent = (create_at: string) => {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo de Prueba</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff;">
  <!-- Contenedor principal -->
  <div style="max-width: 650px; margin: 0 auto;">
    <!-- Encabezado -->
    <div style="background-color: #2B3D5E; color: #fff; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
      <img src="cid:logo" alt="Mangata Beach Club" style="width: 200px;" loading="lazy">      
    </div>
    
    <!-- Cuerpo del email -->
    <div style="padding: 24px; margin-top: 16px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; background-color: #f9f9f9;">
      <!-- Tabla -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #fff;">
        <thead>
          <tr>
            <th style="padding: 16px; text-align: left; border-bottom: 1px solid #e0e0e0; font-weight: 700; font-size:16px;font-family:Montserrat;">Estado</th>
            <th style="padding: 16px; text-align: left; border-bottom: 1px solid #e0e0e0; font-weight: 700; font-size:16px;font-family:Montserrat;">Fecha</th>
            <th style="padding: 16px; text-align: left; border-bottom: 1px solid #e0e0e0; font-weight: 700; font-size:16px;font-family:Montserrat;">Contacto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 16px; text-align: left; border-bottom: 1px solid #e0e0e0;font-size:16px;font-family:Montserrat;color: #4672a5;">Confirmada</td>
            <td style="padding: 16px; text-align: left; border-bottom: 1px solid #e0e0e0;font-size:16px;font-family:Montserrat;color: #4672a5;">${create_at}</td>
            <td style="padding: 16px; text-align: left; border-bottom: 1px solid #e0e0e0;font-size:16px;font-family:Montserrat;color: #4672a5;">+57 3507372901</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Sección destacada -->
      <div style="background: #f8eac9; color: #4672a5; padding: 32px; text-align: center;">
        <p style="font-size: 1.2rem; margin: 0 0 16px 0;font-family:Montserrat;">Hora de llegada al muelle: 7:30 a.m.</p>
        <p style="font-size: 1.2rem; margin: 0 0 16px 0;font-family:Montserrat;">Hora de regreso al muelle: aproximadamente 4:00 p.m.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return html;
};
