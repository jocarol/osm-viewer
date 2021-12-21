let XML;
let processedMap

/**
 * 
 * @param {*} htmlCanvaScript 
 */
const injectCanvasScript = async(htmlCanvaScript) => {
  // Check if the canvas script has already been injected
  // If so, start fresh and inject the new script and canvas
  // into the DOM
  if (document.getElementById('canvasScript')) {
    document.getElementById('canvasScript').remove();
    document.getElementById('canvas').remove();
  }
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'canvasScript');
  script.innerHTML = htmlCanvaScript;
  document.body.appendChild(script);
};

// POST the map.osm file to the server
// to get the canvas back
document.getElementById('submit').onclick = async(e) => {
  let myHeaders = new Headers();

  e.preventDefault();
  myHeaders.append("Content-Type", "application/xml");
  document.getElementById('submit').disabled = true;
  try {
    const response = await fetch('http://localhost:3000/maps', {
      method: 'POST',
      body: XML,
      headers: myHeaders,
      redirect: 'follow',
    });
    // Reset the form
    document.getElementById('form').reset();
    processedMap = await response.text();
    injectCanvasScript(processedMap);
  } catch (err) {
    console.error(err);
  }
};

document.getElementById('form').onchange = async(e) => {
  // Check if the file is an osm file.
  // If so, proceed with processing
  if (e.target.files[0].name.split('.').pop() === 'osm') {
    const reader = new FileReader();

    file = e.target.files[0];
    reader.readAsText(file);
    reader.onload = async(e) => {
      XML = e.target.result;
      document.getElementById("submit").disabled = false;
    }
  } else {
    alert('Please select a valid osm file');
    e.target.files = null;
  }
};