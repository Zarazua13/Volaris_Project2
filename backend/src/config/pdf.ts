import { ResponsiveEntity } from '../domain/entities'
import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'

export class PdfAdapter {

  static async generatePDF(responsive: ResponsiveEntity): Promise<string | null> {

    return new Promise(resolve => {
      const MARGINS = { LEFT: 40, RIGHT: 40, TOP: 25, BOTTOM: 25 }

      const doc = new PDFDocument({
        size: 'Letter',
        margins: {
          left: MARGINS.LEFT,
          right: MARGINS.RIGHT,
          bottom: MARGINS.BOTTOM,
          top: MARGINS.TOP
        }
      });

      const writeStream = fs.createWriteStream(path.join('public', 'responsives', responsive.id + '.pdf'))

      doc.pipe(writeStream);

      const imagePath = path.join('assets', 'img', 'volaris-logo.png')

      doc.image(imagePath, MARGINS.LEFT, 10, { fit: [50, 50] });

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(14)
        .text('FOR-SIS-DEL-12\nCARTA RESPONSIVA DE HERRAMIENTA DE TRABAJO', MARGINS.LEFT, MARGINS.TOP, { align: 'center' });

      const fontName = 'Helvetica'

      const fontSize = 8

      doc.font(fontName).fontSize(fontSize).text('\n')

      const date = ''

      const txt = fs.readFileSync(path.join('assets', 'template', 'text.txt'), 'utf-8')
        .replace('{{time}}', date)
        .replace('{{date}}', date)

      doc.font(fontName).fontSize(fontSize).text(txt, {
        align: 'justify',
        oblique: true
      })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(8)
        .text('CARACTERÍSTICAS DE LA HERRAMIENTA', { align: 'center' });

      doc.moveTo(MARGINS.LEFT, 460)
        .lineTo(570, 460)
        .lineTo(570, 725)
        .lineTo(MARGINS.LEFT, 725)
        .lineTo(MARGINS.LEFT, 460)
        .stroke();

      doc.moveTo(307, 550)
        .lineTo(307, 725)
        .stroke()

      doc.moveTo(MARGINS.LEFT, 680)
        .lineTo(570, 680)
        .stroke();

      const rowHeight = 15
      let y = 460 + rowHeight

      const { serialNumber, brand, device, model, comment, referenceNumber, location } = responsive

      const formInputs = [
        `EQUIPO: ${device.name}`,
        `MARCA: ${brand}`,
        `NUMERO DE SERIE: ${serialNumber}`,
        `MODELO: ${model}`,
        `UBICACIÓN: ${location.name}`,
        `CONDICIONES ESPECÍFICAS DE USO: ${comment}`
      ]

      formInputs.forEach(formInput => {
        doc
          .font('Helvetica')
          .fontSize(9)
          .text(formInput, MARGINS.LEFT + 2, y - 11, { align: 'left', oblique: true });
        doc.moveTo(MARGINS.LEFT, y)
          .lineTo(570, y)
          .stroke();

        y += rowHeight

      })

      const { assigner, receiver } = responsive

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text('ENTREGA', MARGINS.LEFT, 555, { width: 263, align: 'center' });

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text('FIRMA', MARGINS.LEFT, 670, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(assigner.name, MARGINS.LEFT, 685, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(assigner.position.name, MARGINS.LEFT, 698, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(assigner.employeeNumber, MARGINS.LEFT, 711, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text('RECIBE', 307, 555, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text('FIRMA', 307, 670, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(receiver.name, 307, 685, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(receiver.position.name, 307, 698, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(receiver.employeeNumber, 307, 711, { width: 263, align: 'center' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(`CRHT-${location.name}-AXT-LAP-${referenceNumber}`, MARGINS.LEFT, 730, { width: 526, align: 'right' })

      doc
        .font('Helvetica-BoldOblique')
        .fontSize(9)
        .text(`PARA USO EXCLUSIVO DE LAS EMPRESAS DEL GRUPO VOLARIS\nDERECHOS RESERVADOS`, MARGINS.LEFT, 745, { width: 526, align: 'center' })

      doc.end();

      writeStream.on('finish', () => {
        resolve(responsive.id + '.pdf')
      })

      writeStream.on('error', (e) => {
        console.log(e)
        resolve(null)
      })


    })

  }

}
