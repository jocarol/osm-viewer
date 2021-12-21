let XML;
let processedMap

// POST the map.osm file to the server
// to get the canvas back from the server
document.getElementById('submit').onclick = async(e) => {
  let myHeaders = new Headers();

  e.preventDefault();
  if (document.getElementById('canvasScript')) {
    console.log('removing canvasScript from DOM');
    document.getElementById('canvasScript').remove();
  }
  myHeaders.append("Content-Type", "application/xml");
  try {
    const response = await fetch('http://localhost:3000/maps', {
      method: 'POST',
      body: XML,
      headers: myHeaders,
      redirect: 'follow',
    });
    processedMap = await response.text();
    injectCanvasScript(processedMap);
  } catch (err) {
    console.log(err);
  }
};

const injectCanvasScript = async(htmlCanvaScript) => {
  console.log('injecting canvasScript into DOM');
  // console.log(htmlCanvaScript)
  const script = document.createElement('script');

  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', 'canvasScript');
  script.innerHTML = htmlCanvaScript;
  document.body.appendChild(script);
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