/* JS Toc Generator

  Takes the JSON object from toc.js in the same directory and generates
  a TOC using this scheme:

  <details >
  <summary style="padding-left: 10px; border-left: 3px solid #E1C81C">
    <a href="/introduction/index.html"> Introduction </a>
  </summary>
  <details >
    <summary style="padding-left: 10px; border-left: 3px solid #E1C81C">
      <a href="/introduction/installation-and-setup/index.html">Installation and Setup</a>
    </summary>
  </details>
</details>*/

function surroundWithTag(string, tagName, attributes)
{
	return "<" + tagName + " " + attributes + ">" + string + "</" + tagName + ">";
}

function createTocElement(object)
{
    if(!object.Title || object.Title.length == 0)
      return "";

    if(object.URL && object.URL.includes('#'))
      return "";

    var path = window.location.pathname;
    var normalizedPath = path.startsWith('/') ? path.substring(1) : path;
    var thisPath = object.URL.replace("/index.html", "").replace("index.html", "");
    var normalizedCurrentPath = normalizedPath.replace("/index.html", "").replace("index.html", "");

    var isOpen = normalizedPath.indexOf(thisPath) != -1;
    var isSelected = normalizedCurrentPath == thisPath;
    var selectedStyle = isSelected ? "class=\"selected_details\"" : "";

    var borderColor = object.Colour || "#666666";

    var hasOnlyAnchors = false;
    if(object.Children && object.Children.length > 0) {
      hasOnlyAnchors = true;
      for(var i = 0; i < object.Children.length; i++) {
        if(!object.Children[i].URL || !object.Children[i].URL.includes('#')) {
          hasOnlyAnchors = false;
          break;
        }
      }
    }


    var detailsClass = hasOnlyAnchors ? "class=\"has-anchors\"" : "";

    var link = surroundWithTag(object.Title, "a", "href='" + object.URL + "'");
    var summary = surroundWithTag(link, "summary", selectedStyle + " style=\"border-left: 3px solid " + borderColor + ";\"");

    if(object.Children && object.Children.length > 0) {
      for(var i = 0; i < object.Children.length; i++) {
        summary += createTocElement(object.Children[i]);
      }
    }

    summary += "\n";

    return surroundWithTag(summary, "details", (isOpen ? "open " : "") + detailsClass);
}

function renderTOC() {


  if (typeof rootDb === 'undefined') {
    return;
  }


  var tocContainer = document.getElementById('toc-container');
  if (!tocContainer) {
    return;
  }


  var startTime = performance.now();

  var html = '';
  if (rootDb.Children && rootDb.Children.length > 0) {
    for (var i = 0; i < rootDb.Children.length; i++) {
      html += createTocElement(rootDb.Children[i]);
    }
  }


  tocContainer.innerHTML = html;

  var renderTime = (performance.now() - startTime).toFixed(1);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTOC);
} else {
  renderTOC();
}


 function initMobileSidebar() {

  var toc = document.querySelector(".toc");
  var menuButton = document.getElementById("nav-button");

  if (!toc || !menuButton) {
    return;
  }


  menuButton.addEventListener("click", function () {
    toc.classList.toggle("open");
  })

  document.body.addEventListener("click", function (e) {
    if (e.target !== menuButton && !toc.contains(e.target)) {
      toc.classList.remove("open");
    }
  })

  var start = {}, end = {}

  document.body.addEventListener("touchstart", function (e) {
    start.x = e.changedTouches[0].clientX
    start.y = e.changedTouches[0].clientY
  })

  document.body.addEventListener("touchend", function (e) {
    end.y = e.changedTouches[0].clientY
    end.x = e.changedTouches[0].clientX

    var xDiff = end.x - start.x
    var yDiff = end.y - start.y

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0 && start.x <= 80) toc.classList.add("open")
      else toc.classList.remove("open")
    }
  })

}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileSidebar);
  } else {
    initMobileSidebar();
}
