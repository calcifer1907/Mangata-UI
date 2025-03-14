export const htmlContent = (create_at: string) => {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Correo de Prueba</title>
  <style>
    :root {
      --Paper-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
      --Paper-overlay: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7));
    }
    body {
      font-family: Montserrat;
    }
    .css-11sb5cn {
      max-width: 650px;
      margin: 0 auto;
    }
    .css-17p2rj5 {
      padding: 24px;
      margin-top: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px 8px 0 0;
      background-color: #f9f9f9;
    }
    .css-b00asm-MuiTypography-root {
      margin: 0;
      font-weight: 400;
      font-size: 2.125rem;
      line-height: 1.235;
      letter-spacing: 0.00735em;
      margin-bottom: 0.35em;
      text-align: center;
      color: #46AE32;
    }
    .css-1uj8odg-MuiPaper-root-MuiTableContainer-root {
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
      -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 4px;
      box-shadow: var(--Paper-shadow);
      background-image: var(--Paper-overlay);
      width: 100%;
      overflow-x: auto;
      margin-bottom: 24px;
    }
    .css-1xwxv7r-MuiTable-root {
      display: table;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }
    .css-1a7iywq-MuiTableHead-root {
      display: table-header-group;
    }
    .paper-shadow {
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }
    .css-1orzuox-MuiTableCell-root {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      display: table-cell;
      vertical-align: inherit;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      text-align: left;
      padding: 16px;
      color: rgba(0, 0, 0, 0.87);
      line-height: 1.5rem;
      font-weight: 500;
    }
    .css-gmh7jj-MuiTableBody-root {
      display: table-row-group;
    }
    .css-1xtozoh-MuiTableRow-root {
      color: inherit;
      display: table-row;
      vertical-align: middle;
      outline: 0;
    }
    .css-1dc80h3-MuiTableCell-root {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      display: table-cell;
      vertical-align: inherit;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      text-align: left;
      padding: 16px;
      color: rgba(0, 0, 0, 0.87);
    }
    .css-qo4gx7 {
      background: #f8eac9;
      color: #4672a5;
      padding: 32px;
      text-align: center;
      height: auto;
      -webkit-align-content: center;
      -ms-flex-line-pack: center;
      align-content: center;
    }
    .css-qo4gx7 p {
      font-size: 1.5rem;
    }
    .circus-tent {
      position: relative;
      --tw-space-y-reverse: 0;
      margin-top: calc(-1px* calc(1 - 0));
      margin-bottom: calc(-1px* 0);
      overflow: hidden;
    }
    .w-full {
      border: 1px solid #e5e7eb;
      width: 100%;
      height: 2rem;
      position: relative;
      z-index: 1;
    }
    .absolute {
      position: absolute;
      --tw-translate-y: 50%;
      transform: translate(0, 50%) rotate(0) skew(0) skewY(0) scaleX(1) scaleY(1);
      display: flex;
      bottom: 0;
      left: -.75rem;
      z-index: 2;
    }
    .rounded-full {
      border-radius: 9999px;
      width: 1.5rem;
      height: 1.5rem;
      background-color: rgb(255 255 255 / 1);
      border: 1px solid #e5e7eb;
    }
    /*#4672a5;*/
    .mangata-title {
      background: #2B3D5E;
      color: #fff;
      padding: 16px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .mangata-title h1 {
      letter-spacing: 0.7em;
      font-weight: 100;
      text-transform: uppercase;
      text-emphasis: " ";
    }
  </style>
</head>
<body>
  <div class="MuiBox-root css-11sb5cn">
    <div class="MuiBox-root css-17p2rj5">
      <div class="mangata-title">
        <img src="https://mangata-ui-client.vercel.app/images/svgMangataWhite.svg" alt="Mangata Beach Club" style="width: 200px;">
        <!-- <h1>Mangata Beach Club</h3> -->
      </div>
      <div
        class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root css-1uj8odg-MuiPaper-root-MuiTableContainer-root">
        <table class="MuiTable-root css-1xwxv7r-MuiTable-root">
          <thead class="MuiTableHead-root css-1a7iywq-MuiTableHead-root">
            <tr class="MuiTableRow-root MuiTableRow-head css-1xtozoh-MuiTableRow-root">
              <th class="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium css-1orzuox-MuiTableCell-root"
                scope="col">Estado</th>
              <th class="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium css-1orzuox-MuiTableCell-root"
                scope="col">Fecha</th>
              <th class="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium css-1orzuox-MuiTableCell-root"
                scope="col">Contacto</th>
            </tr>
          </thead>
          <tbody class="MuiTableBody-root css-gmh7jj-MuiTableBody-root">
            <tr class="MuiTableRow-root css-1xtozoh-MuiTableRow-root">
              <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1dc80h3-MuiTableCell-root">
                Confirmada</td>
              <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1dc80h3-MuiTableCell-root">
                ${create_at}</td>
              <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1dc80h3-MuiTableCell-root">
                +57 3507372901</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="MuiBox-root css-qo4gx7">
        <p class="">Hora de llegada al muelle: 7:30
          a.m.</p>
        <p class="MuiTypography-root MuiTypography-body1 css-19t6bb6-MuiTypography-root">Hora de regreso al muelle:
          aproximadamente 4:00 p.m.</p>
      </div>
    </div>
    <div class="circus-tent">
      <div class="w-full"></div>
      <div class="absolute">
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
        <div class="rounded-full"></div>
      </div>
    </div>
  </div>
</body>
</html>`;

  return html;
};
