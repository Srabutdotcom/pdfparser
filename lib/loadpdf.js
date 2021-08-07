import {parsepdf} from './parsepdf.js';

export async function loadpdf(file, pdfjsLib, pageNum,pdf2base64,atob){
    const binarypdf = atob(await pdf2base64(file));
    // Asynchronous download of PDF
    const loadingTask = await pdfjsLib.getDocument({data: binarypdf});
    //debugger;
    const pdf = await (function(){return loadingTask.promise})()
/*     const _numPages = pdf._pdfInfo.numPages;
    const _Attachements = await (function(){return pdf.getAttachments()})();
    const _data = await (function(){return pdf.getData()})();
    const _Destinations = await (function(){return pdf.getDestinations()})();
    const _Metadata = await (function(){return pdf.getMetadata()})();
    const _Outline = await (function(){return pdf.getOutline()})();
    const _PageLayout = await (function(){return pdf.getPageLayout()})();
    const _annotationStorage = pdf.annotationStorage; */
    const Page = await (function(){return pdf.getPage(pageNum)})();
    const textContent = await (function(){return Page.getTextContent()})()
    
    const rotate = Page._pageInfo.rotate
    
    //return parsepdf(textContent.items,rotate,Page._pageInfo.view).map(e=>e.map(f=>{return {x:f.x,r:f.r}}));
    return parsepdf(textContent.items,rotate,Page._pageInfo.view).map(e=>e.map(f=>{return f?f.str:''}));
    //return parsepdf(textContent.items,rotate,Page._pageInfo.view).map(e=>e.map(f=>f));
    //return parsepdf(textContent.items,rotate,Page._pageInfo.view)
    //debugger;
    //return Page._pageInfo
  }

  export async function loadpdfInClient(binary,pdfjsLib){
    const loadingTask = await pdfjsLib.getDocument({data: binary});
    return await (function(){return loadingTask.promise})()
  }

  export async function parsepdfpage(pdf,pageNum){
    const page = await (function(){return pdf.getPage(pageNum)})();
    const textContent = await (function(){return page.getTextContent()})()
    //const outpdf = parsepdf(textContent.items,page._pageInfo.rotate,page._pageInfo.view)
    //debugger; 
    return parsepdf(textContent.items,page._pageInfo.rotate,page._pageInfo.view).map(e=>e.map(f=>{return f?f.str:''}));
  }

  //export { loadPdf }