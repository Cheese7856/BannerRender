const canvas = document.getElementById("canvas");

function ymlToJson() {
  const textarea = document.getElementById("encoded");
  //const encoded =
  //"rO0ABXQA9z09OiBvcmcuYnVra2l0LmludmVudG9yeS5JdGVtU3RhY2sKdjogNDE4OQp0eXBlOiBSRURfQkFOTkVSCm1ldGE6CiAgPT06IEl0ZW1NZXRhCiAgbWV0YS10eXBlOiBCQU5ORVIKICBwYXR0ZXJuczoKICAtIHs9PTogUGF0dGVybiwgY29sb3I6IEJMQUNLLCBwYXR0ZXJuOiAnbWluZWNyYWZ0OnN0cmlwZV9yaWdodCd9CiAgLSB7PT06IFBhdHRlcm4sIGNvbG9yOiBZRUxMT1csIHBhdHRlcm46ICdtaW5lY3JhZnQ6c3RyaXBlX2xlZnQnfQo=";

  encoded = textarea.value;

  const decoded = atob(encoded);
  const sliced = decoded.slice(7);
  const yamlData = jsyaml.load(sliced);

  return yamlData;
}

function renderBanner() {
  canvas.innerHTML = "";

  const data = ymlToJson();

  if (data.type) {
    const clr = data.type.replace("_BANNER", "");
    const baseElem = document.createElement("i");
    baseElem.setAttribute("ptn", "base");
    baseElem.setAttribute("id", "base");
    baseElem.setAttribute("clr", clr);
    canvas.appendChild(baseElem);
  } else {
    console.error("Type ikke funnet i JSON.");
  }

  if (data.meta && Array.isArray(data.meta.patterns)) {
    data.meta.patterns.forEach((patternObj) => {
      const ptn = patternObj.pattern.replace("minecraft:", "");
      const clr = patternObj.color;

      const iElem = document.createElement("i");
      iElem.setAttribute("ptn", ptn);
      iElem.setAttribute("clr", clr);
      canvas.appendChild(iElem);
    });
  } else {
    console.error("Ingen meta.patterns funnet.");
  }
}

renderBanner();
