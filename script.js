(function () {
  const { counter } = H2GO_CONFIG;

  const fromBottle = new URLSearchParams(location.search).get("src") === "nfc";
  const endpoint = fromBottle ? "hit" : "get";

  const counterEl = document.getElementById("counter-value");
  fetch(`https://abacus.jasoncameron.dev/${endpoint}/${counter.namespace}/${counter.key}`)
    .then((r) => r.json())
    .then((data) => {
      counterEl.textContent = data.value;
    })
    .catch(() => {
      counterEl.textContent = "?";
    });

  if (!fromBottle) {
    document.getElementById("notice").hidden = false;
  }
})();
