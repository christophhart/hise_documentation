// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("type", event => {
    //console.log(event);
})


// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
  data: {
    src: async () => {
      // Loading placeholder text
      document.querySelector("#autoComplete").setAttribute("placeholder", "Search...");
      // Fetch External Data Source
      const source = await fetch("./db/db.json");
      const data = await source.json();
      // Returns Fetched data
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
  maxResults: 28,
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
    //window.location.href = (selection);
    // Render selected choice to selection div
    document.querySelector(".selection").innerHTML = selection;
    // Clear Input
    document.querySelector("#autoComplete").value = "";
    // Change placeholder with the selected value
    document.querySelector("#autoComplete").setAttribute("placeholder", feedback.selection.value.key);
    // Concole log autoComplete data feedback
    //console.log(feedback);
  }
});

// On page load add class to input field
window.addEventListener("load", () => {
  document.querySelector("#autoComplete").classList.add("out");
  document.querySelector("#autoComplete_results_list").style.display = "none";
});

// Toggle results list and other elements
const action = action => {
  const title = document.querySelector("h1");
  const selection = document.querySelector(".selection");
  const footer = document.querySelector(".footer");

};

// Toggle event for search input
// showing & hidding results list onfocus / blur
// ["focus", "blur"].forEach(eventType => {
["focus", "blur", "mousedown", "keydown"].forEach(eventType => {
  const input = document.querySelector("#autoComplete");
  const resultsList = document.querySelector("#autoComplete_results_list");

  document.querySelector("#autoComplete").addEventListener(eventType, event => {
    // Hide results list & show other elemennts
    if (eventType === "blur") {
      action("dim");
    } else if (eventType === "focus") {
      // Show results list & hide other elemennts
      action("light");
    }
  });

  // Hide Results list when not used
  document.addEventListener(eventType, event => {
    var current = event.target;
    if (
      current === input ||
      current === resultsList ||
      input.contains(current) ||
      resultsList.contains(current)
    ) {
      resultsList.style.display = "block";
      resultsList.style.paddingTop = "12px";
      resultsList.style.paddingLeft = "12rem";
    } else {
      resultsList.style.display = "none";
    }
  });
});

// Toggle Input Classes on results list focus to keep style
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
