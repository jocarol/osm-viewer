let XML;
let processedMap

const injectCanvasScript = async(htmlCanvaScript) => {
  if (document.getElementById('canvasScript')) {
    document.getElementById('canvasScript').remove();
    document.getElementById('canvas').remove();
  }
  console.log('injecting canvasScript into DOM');
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'canvasScript');
  script.innerHTML = htmlCanvaScript;
  document.body.appendChild(script);
};


// POST the map.osm file to the server
// to get the canvas back from the server
document.getElementById('submit').onclick = async(e) => {
  let myHeaders = new Headers();

  // Clean the form fields
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
    document.getElementById('form').reset();
    processedMap = await response.text();
    injectCanvasScript(processedMap);
  } catch (err) {
    console.log(err);
  }
};

document.getElementById('form').onchange = async(e) => {
  // Check if the file is an osm file. If so, proceed with processing
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