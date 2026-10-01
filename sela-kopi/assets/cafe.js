(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle"),
    nav = document.getElementById("cafe-nav");
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !e.target.closest(".cafe-header"))
      closeMenu();
  });
  const tools = document.querySelector(".menu-tools");
  if (tools) {
    tools.hidden = false;
    const buttons = [...document.querySelectorAll("[data-filter]")],
      items = [...document.querySelectorAll(".menu-item")],
      groups = [...document.querySelectorAll("[data-group]")],
      search = document.getElementById("menu-search"),
      status = document.getElementById("menu-status");
    let selected = "all";
    const filter = () => {
      const term = search.value.trim().toLocaleLowerCase("en");
      let count = 0;
      items.forEach((item) => {
        const match =
          (selected === "all" || item.dataset.category === selected) &&
          item.textContent.toLocaleLowerCase("en").includes(term);
        item.hidden = !match;
        if (match) count++;
      });
      groups.forEach((group) => {
        group.hidden = ![...group.querySelectorAll(".menu-item")].some(
          (item) => !item.hidden,
        );
      });
      buttons.forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.filter === selected),
        ),
      );
      status.textContent = `${count} ${count === 1 ? "item" : "items"}${selected === "all" ? "" : ` · ${buttons.find((b) => b.dataset.filter === selected).textContent}`} · all prices in RM`;
      document.getElementById("empty-state").hidden = count !== 0;
    };
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        selected = button.dataset.filter;
        filter();
      }),
    );
    search.addEventListener("input", filter);
    document.getElementById("reset-menu").addEventListener("click", () => {
      selected = "all";
      search.value = "";
      filter();
      buttons[0].focus();
    });
  }
  const form = document.getElementById("booking-form");
  if (!form) return;
  const date = document.getElementById("visit-date"),
    time = document.getElementById("visit-time"),
    error = document.getElementById("booking-error"),
    dialog = document.getElementById("enquiry-dialog"),
    output = document.getElementById("enquiry-text");
  const today = () =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kuala_Lumpur",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  const weekday = (value) => new Date(value + "T12:00:00+08:00").getUTCDay();
  date.min = today();
  function populateTimes() {
    date.setCustomValidity("");
    error.textContent = "";
    time.replaceChildren(new Option("Choose a time", ""));
    if (!date.value) return;
    if (weekday(date.value) === 2) {
      date.setCustomValidity(
        "The café is closed on Tuesdays. Please choose another day.",
      );
      error.textContent = "Tuesday is our day off. Please choose another day.";
      return;
    }
    const late = [0, 5, 6].includes(weekday(date.value)),
      end = late ? 19 : 17;
    const now = new Date();
    for (let h = 9; h <= end; h++)
      for (const m of [0, 30]) {
        const value =
          String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
        if (new Date(date.value + "T" + value + ":00+08:00") <= now) continue;
        const label =
          (h % 12 || 12) +
          ":" +
          String(m).padStart(2, "0") +
          (h < 12 ? " am" : " pm");
        time.add(new Option(label, value));
      }
    if (time.options.length === 1)
      error.textContent =
        "There are no remaining times for this day. Please choose another date.";
  }
  date.addEventListener("change", populateTimes);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    date.min = today();
    if (!form.reportValidity()) return;
    if (date.value < today() || weekday(date.value) === 2) {
      error.textContent = "Please choose a future opening day.";
      date.focus();
      return;
    }
    if (new Date(date.value + "T" + time.value + ":00+08:00") <= new Date()) {
      populateTimes();
      error.textContent = "That time has passed. Please choose a later time.";
      time.focus();
      return;
    }
    const day = new Intl.DateTimeFormat("en-MY", {
      dateStyle: "full",
      timeZone: "Asia/Kuala_Lumpur",
    }).format(new Date(date.value + "T12:00:00+08:00"));
    const party = document.getElementById("party-size").value,
      note = document.getElementById("visit-note").value.trim();
    output.value = `DEMO ENQUIRY — NOT SENT\n\nHello Sela Kopi! I'd like to ask about a table.\n\nDay: ${day}\nTime: ${time.options[time.selectedIndex].text}\nParty: ${party} ${party === "1" ? "person" : "people"}${note ? "\nNote: " + note : ""}\n\nPlease let me know if a table is available. Thank you!`;
    document.getElementById("copy-status").textContent = "";
    dialog.showModal();
  });
  document
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    if (
      e.target === dialog &&
      (e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom)
    )
      dialog.close();
  });
  document
    .getElementById("copy-enquiry")
    .addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(output.value);
        document.getElementById("copy-status").textContent =
          "Sample message copied. No enquiry was sent.";
      } catch {
        output.focus();
        output.select();
        document.getElementById("copy-status").textContent =
          "Select and copy the sample message above.";
      }
    });
})();
