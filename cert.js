

// Import PDFDocument from PDFLib
const {PDFDocument} = PDFLib;

const generatePDF = async (content)=>{

    // Fectch PDF backgroud data into an Array
    const bgPdfBytes = await fetch("CertificateBG.pdf").then(res => res.arrayBuffer());

    // Fetch Font
    const centFontBytes = await fetch("CENTURY.ttf").then(res => res.arrayBuffer());

    // Load a PDF with background data
    const pdfDoc = await PDFDocument.load(bgPdfBytes);

   // Register the `fontkit` instance
   pdfDoc.registerFontkit(fontkit);

    // Embed font to pdfDoc
    const centFont = await pdfDoc.embedFont(centFontBytes);

    
    // Get total number of pages from PDF doc
    const pages = pdfDoc.getPages();

    //Select first page
    const firstPage = pages[0];

    const {width,height} = firstPage.getSize();

    // Edit First Page
    firstPage.drawText(content, {

        // Starting POSITION of the content can be modified from here
        x: 70,
        y: 300,
        
        maxWidth: width-130,
        size: 14,
        font: centFont
    });

    
    // Convert pdfDoc to Data URI
    const pdfDataUri = await pdfDoc.saveAsBase64({dataUri: true});

    document.querySelector("#iframe").src = pdfDataUri;

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
};

generatePDF($content)