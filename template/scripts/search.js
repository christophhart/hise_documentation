// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("type", event => {
})

const autoCompletejs = new autoComplete({
  data: {
    src: async () => {
      document.querySelector("#autoComplete").setAttribute("placeholder", "Search...");
      const source = await fetch("/template/scripts/search.json");
      const data = await source.json();
      return data;
    },
    key: ["key"]
  },
  sort: (a, b) => {
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  weighted: (a, b) => {
    if (a.value.weight > b.value.weight) return -1;
    if (a.value.weight < b.value.weight) return 1; 
    return 0;
  },
  placeHolder: "Search ...",
  selector: "#autoComplete",
  threshold: 0,
  searchEngine: "strict",
  highlight: true,
  maxResults: 32,
  resultsList: {
    container: source => {
      resultsListID = "autoComplete_results_list";
      return resultsListID;
    },
    destination: document.querySelector("#autoComplete"),
    position: "afterend"
  },
  resultItem: (data, source) => {
    return `${data.match}`;
  },
  onSelection: feedback => {
    const selection = feedback.selection.value.url;
    window.location.href = (selection);
    document.querySelector("#autoComplete").value = "";
    document.querySelector("#autoComplete").setAttribute("placeholder", feedback.selection.value.key);
  }
});

window.addEventListener("load", () => {
  document.querySelector("#autoComplete").classList.add("out");
  document.querySelector("#autoComplete_results_list").style.display = "none";
});

const action = action => {
  const title = document.querySelector("h1");
  const selection = document.querySelector(".selection");
  const footer = document.querySelector(".footer");
};

["focus", "blur", "mousedown", "keydown"].forEach(eventType => {
  const input = document.querySelector("#autoComplete");
  const resultsList = document.querySelector("#autoComplete_results_list");


  document.addEventListener(eventType, event => {
    var current = event.target;
    if (
      current === input ||
      current === resultsList ||
      input.contains(current) ||
      resultsList.contains(current)
    ) {
      resultsList.style.display = "block";

    } else {
      resultsList.style.display = "none";
    }
  });
});

["focusin", "focusout", "keydown"].forEach(eventType => {
  document.querySelector("#autoComplete_results_list").addEventListener(eventType, event => {
    if (eventType === "focusin") {
      if (event.target && event.target.nodeName === "LI") {
        action("light");
        document.querySelector("#autoComplete").classList.remove("out");
        document.querySelector("#autoComplete").classList.add("in");
      }
    } else if (eventType === "focusout" || event.keyCode === 13) {
      action("dim");
      document.querySelector("#autoComplete").classList.remove("in");
      document.querySelector("#autoComplete").classList.add("out");
    }
  });
});
