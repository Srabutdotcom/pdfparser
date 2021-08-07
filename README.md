# Parse Text from PDF file
This tool is intended to parse or extract text from pdf,
not only extract but also arrange the text in the order
like in the pdf. Thus, we can use the data in excel for 
further processing. 
The tool are created using the help of pdfjsLib from mozilla pdf.js.
Successfully tested using pdfjsLib version 2.9.359.
Please use this version instead
## Usage
~~~js
import {loadpdfInClient,parsepdfpage} from 'main.compress.js'
// first we need to load pdfjsLib
// then load pdf file using loadpdfInClient function
// @param {ArrayBuffer} pdfbinaryfile - the pdf file in the form of binary format
// @param {pdfjsLib} pdfjsLib - pdf.js tool from http://mozilla.github.io/pdf.js
const pdf = loadpdfInClient(pdfbinaryfile, pdfjsLib)
// extract text in the form of csv using parsePdfpage function
// @param {pdf Object} pdf - pdf Object result from loadpdfInClient 
// @param {number} page - optional, the page number of pdf you want to parse
const csv = parsepdfpage(pdf,page)
~~~
