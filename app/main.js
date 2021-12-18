// Nothing but a TEST route to fetch the map.osm file
let getXMLfromServer = async() => {
  try {
    const response = await fetch('http://localhost:3000/maps', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/xml'
      }
    });
    const data = await response.text();

    // console.log("data", data);
    return data;
  } catch (err) {
    console.log(err);
  }
  // return data;
};

// POST the map.osm file to the server
// to get the canvas back from the server
const getCanvasFromXML = async(map) => {
  // console.log(map)
  try {
    const response = await fetch('http://localhost:3000/maps', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml'
      },
      body: map
    });
    return await response.text();
  } catch (err) {
    console.log(err);
  }
  // return data;
};

const injectCanvasScript = async(htmlCanvaScript) => {
  console.log("injectCanvasScript");
  const script = document.createElement('script');
  const mapAnchor = document.getElementById('mapAnchor');

  script.setAttribute('type', 'text/javascript');
  script.innerHTML = htmlCanvaScript;
  // Remove the div element named "loading" in the DOM
  document.getElementById('loading').remove();
  document.body.appendChild(script);
};

const getCanvas = async() => {
  try {
    const payload = await getXMLfromServer();
    const canvasFromXML = await getCanvasFromXML(payload);

    await injectCanvasScript(canvasFromXML);
  } catch (error) {
    console.error(error);
  }
};

getCanvas()