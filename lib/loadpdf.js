import {parsepdf} from './parsepdf.js';

export async function loadpdf(file, pdfjsLib, pageNum,pdf2base64,atob){
    const binarypdf = atob(await pdf2base64(file));
    // Asynchronous download of PDF
    let loadingTask = await pdfjsLib.getDocument({data: binarypdf});
    //debugger;
    let pdf = await (function(){return loadingTask.promise})()
    let numPages = pdf._pdfInfo.numPages;
    let Attachements = await (function(){return pdf.getAttachments()})();
    let data = await (function(){return pdf.getData()})();
    let Page = await (function(){return pdf.getPage(pageNum)})();
    let Destinations = await (function(){return pdf.getDestinations()})();
    let Metadata = await (function(){return pdf.getMetadata()})();
    let Outline = await (function(){return pdf.getOutline()})();
    let PageLayout = await (function(){return pdf.getPageLayout()})();
    let annotationStorage = pdf.annotationStorage;
    
    let textContent = await (function(){return Page.getTextContent()})()
    
    let rotate = Page._pageInfo.rotate
    
    //return parsepdf(textContent.items,rotate,Page._pageInfo.view).map(e=>e.map(f=>{return {x:f.x,r:f.r}}));
    return parsepdf(textContent.items,rotate,Page._pageInfo.view).map(e=>e.map(f=>{return f?f.str:''}));
    //return parsepdf(textContent.items,rotate,Page._pageInfo.view).map(e=>e.map(f=>f));
    //return parsepdf(textContent.items,rotate,Page._pageInfo.view)
    //debugger;
    return Page._pageInfo
  }

  export async function loadpdfInClient(binary,pdfjsLib){
    let loadingTask = await pdfjsLib.getDocument({data: binary});
    return await (function(){return loadingTask.promise})()
  }

  export async function parsepdfpage(pdf,pageNum){
    let page = await (function(){return pdf.getPage(pageNum)})();
    let textContent = await (function(){return page.getTextContent()})()
    const outpdf = parsepdf(textContent.items,page._pageInfo.rotate,page._pageInfo.view)
    debugger; 
    return parsepdf(textContent.items,page._pageInfo.rotate,page._pageInfo.view).map(e=>e.map(f=>{return f?f.str:''}));
  }

  //export { loadPdf }