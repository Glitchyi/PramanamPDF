const { invoke } = window.__TAURI__.tauri;


// Get the drop zone element
const dropZone = document.getElementById("dropZone");

function handleUpload() {
  const fileInput = document.getElementById('fileInput');
  // const file = fileInput.files[0];

  console.log(fileInput.value);
  // console.log(file);
  invoke('readdir', {path:'C:\\Users\\user\\Desktop\\self\\export\\sudu`'}).then((message) => console.log(message));
  // if (file) {
  //   const reader = new FileReader();

  //   reader.onload = function(event) {
  //     const fileData = event.target.result;
  //     loadPDF(fileData);
  //   };

  //   reader.readAsArrayBuffer(file);
  // } else {
  //   alert('Please select a file to upload.');
  // }
}

function loadPDF(pdfData) {
  pdfjsLib.getDocument(pdfData).promise.then(function (pdf) {
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      pdf.getPage(pageNum).then(function (page) {
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const container = document.getElementById("pdfContainer");
        container.appendChild(canvas);

        page.render({ canvasContext: context, viewport: viewport });
      });
    }
  });
}
