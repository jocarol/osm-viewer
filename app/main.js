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
    const data = await response.text();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  // return data;
};

const addCanvasToDom = async(htmlCanvaString) => {
  const mapDiv = document.getElementById('map');

  console.log(mapDiv);
  console.log(htmlCanvaString);
  mapDiv.innerHTML = htmlCanvaString;
}

const getCanvas = async() => {
  const bodyToSend = await getXMLfromServer();
  const canvasFromXML = await getCanvasFromXML(bodyToSend);

  await addCanvasToDom(canvasFromXML);
};

getCanvas()