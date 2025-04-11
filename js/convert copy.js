function ymlToJson() {
  const encoded =
    "rO0ABXQA9z09OiBvcmcuYnVra2l0LmludmVudG9yeS5JdGVtU3RhY2sKdjogNDE4OQp0eXBlOiBSRURfQkFOTkVSCm1ldGE6CiAgPT06IEl0ZW1NZXRhCiAgbWV0YS10eXBlOiBCQU5ORVIKICBwYXR0ZXJuczoKICAtIHs9PTogUGF0dGVybiwgY29sb3I6IEJMQUNLLCBwYXR0ZXJuOiAnbWluZWNyYWZ0OnN0cmlwZV9yaWdodCd9CiAgLSB7PT06IFBhdHRlcm4sIGNvbG9yOiBZRUxMT1csIHBhdHRlcm46ICdtaW5lY3JhZnQ6c3RyaXBlX2xlZnQnfQo=";

  const decoded = atob(encoded);
  const sliced = decoded.slice(7);
  const yamlData = jsyaml.load(sliced);
  const jsonData = JSON.stringify(yamlData);

  return jsonData;
}

console.log(ymlToJson());

fetch("./fil.json")
  .then((res) => res.json())
  .then((data) => {
    const canvasEl = document.getElementById("canvas");
    if (!canvasEl) {
      console.error('Fant ikke element med id "canvas".');
      return;
    }

    // Opprett base <i>-element fra type-feltet, for eksempel "RED_BANNER"
    if (data.type) {
      // Fjerner "_BANNER" for å få fargen
      const clr = data.type.replace("_BANNER", "");
      const baseElem = document.createElement("i");
      baseElem.setAttribute("ptn", "base");
      baseElem.setAttribute("id", "base");
      baseElem.setAttribute("clr", clr);
      // Legg base-elementet først
      canvasEl.appendChild(baseElem);
    } else {
      console.error("Type ikke funnet i JSON.");
    }

    // Hent ut og opprett <i>-elementer for hvert pattern i meta.patterns
    if (data.meta && Array.isArray(data.meta.patterns)) {
      data.meta.patterns.forEach((patternObj) => {
        // Fjern "minecraft:" fra pattern dersom den finnes
        const ptn = patternObj.pattern.replace("minecraft:", "");
        const clr = patternObj.color;

        const iElem = document.createElement("i");
        iElem.setAttribute("ptn", ptn);
        iElem.setAttribute("clr", clr);
        canvasEl.appendChild(iElem);
      });
    } else {
      console.error("Ingen meta.patterns funnet.");
    }
  })
  .catch((error) => {
    console.error("Feil under henting av JSON:", error);
  });
