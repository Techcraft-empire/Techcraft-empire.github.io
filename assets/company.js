(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (
      nav?.classList.contains("open") &&
      !event.target.closest(".site-header")
    )
      closeMenu();
  });
  const form = document.getElementById("brief-form");
  if (!form) return;
  const result = document.getElementById("brief-result"),
    output = document.getElementById("brief-text"),
    status = document.getElementById("brief-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    output.value = `Ringkasan projek — TechCraft Empire\n\nPerniagaan: ${data.get("business").trim()}\nJenis website: ${data.get("type")}\nAnggaran bajet: ${data.get("budget")}\nSasaran masa: ${data.get("timeline")}\n\nKeperluan:\n${data.get("details").trim()}\n\nSaya ingin berbincang tentang skop dan sebut harga untuk projek ini.`;
    result.hidden = false;
    status.textContent = "";
    result.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
    document.getElementById("result-heading").focus();
  });
  document.getElementById("copy-brief").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      status.textContent =
        "Ringkasan disalin. Tampal dalam perbualan anda dengan TechCraft Empire.";
    } catch {
      output.focus();
      output.select();
      status.textContent = "Pilih dan salin teks ringkasan di atas.";
    }
  });
  document.getElementById("download-brief").addEventListener("click", () => {
    const url = URL.createObjectURL(
      new Blob([output.value], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "ringkasan-projek-techcraft.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent =
      "Ringkasan disediakan sebagai fail teks. Tiada maklumat dihantar secara automatik.";
  });
})();
