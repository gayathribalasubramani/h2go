(function () {
  const { counter } = H2GO_CONFIG;

  const counterEl = document.getElementById("counter-value");
  fetch(`https://abacus.jasoncameron.dev/hit/${counter.namespace}/${counter.key}`)
    .then((r) => r.json())
    .then((data) => {
      counterEl.textContent = data.value;
    })
    .catch(() => {
      counterEl.textContent = "?";
    });
})();
