/* Colorimeter site — micro-interazioni.
   1) Reveal on scroll (IntersectionObserver)
   2) Demo interattiva: campiona il colore del fiore al passaggio del cursore
   3) Click sulla demo → copia HEX (toast di conferma)
*/

(function () {
  "use strict";

  /* ---------- reveal on scroll ---------- */

  const revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealed.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealed.forEach((el) => io.observe(el));
  } else {
    revealed.forEach((el) => el.classList.add("in"));
  }

  /* ---------- demo campionamento colore ---------- */

  const stage = document.querySelector("[data-sampler]");
  if (stage) {
    const img = stage.querySelector("img");
    const loupe = stage.querySelector(".sampler-loupe");
    const swatch = stage.querySelector(".sampler-swatch");
    const hexEl = stage.querySelector(".sampler-hex");
    const toast = document.querySelector(".toast");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let ready = false;
    let currentHex = hexEl ? hexEl.textContent.trim() : "#C16A67";

    function prepare() {
      try {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        // Test di lettura: se il canvas è "tainted" (es. file://) disattiva la demo.
        ctx.getImageData(0, 0, 1, 1);
        ready = true;
      } catch (err) {
        ready = false;
      }
    }
    if (img.complete && img.naturalWidth) prepare();
    else img.addEventListener("load", prepare);

    function toHex(d) {
      return (
        "#" +
        [d[0], d[1], d[2]]
          .map((v) => v.toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase()
      );
    }

    function sampleAt(clientX, clientY) {
      if (!ready) return;
      const r = img.getBoundingClientRect();
      const nx = (clientX - r.left) / r.width;
      const ny = (clientY - r.top) / r.height;
      if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return;

      const px = Math.round(nx * (canvas.width - 1));
      const py = Math.round(ny * (canvas.height - 1));
      const d = ctx.getImageData(px, py, 1, 1).data;
      currentHex = toHex(d);

      if (swatch) swatch.style.background = currentHex;
      if (hexEl) hexEl.textContent = currentHex;
      if (loupe) {
        loupe.style.left = clientX - r.left + "px";
        loupe.style.top = clientY - r.top + "px";
        loupe.style.borderColor = currentHex;
      }
    }

    stage.addEventListener("pointermove", (e) => sampleAt(e.clientX, e.clientY));

    stage.addEventListener("click", () => {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(currentHex).then(() => {
        if (!toast) return;
        toast.textContent = toast.dataset.copied + " " + currentHex;
        toast.classList.add("show");
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove("show"), 1600);
      });
    });
  }

  /* ---------- anno footer ---------- */

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
