hljs.initHighlightingOnLoad();

window.onload = function(e){ 
  var clipboard = new Clipboard('.copy-button', {
    target: function(trigger) {
      var entityName = trigger.getAttribute('data-entity-name');
      return document.getElementById("entity-" + entityName);
    }
  });
}

function save(trigger) {
  var entityName = trigger.getAttribute('data-entity-name');
  var target = document.getElementById("entity-" + entityName);
  var blob = new Blob([target.textContent], {'type': 'text/plain;charset=utf-8'});
  saveAs(blob, entityName + ".swift");
}

function convert () {
  var sourceText = document
    .getElementById("source")
    .value
    .replace(new RegExp("\n", 'g'), " ");

  var destination = document.getElementById("destination");

  try {
    var sourceJSON = JSON.parse(sourceText);
  } catch(e) {
    destination.innerText = e;
    return;
  }

  var writers = [json2swift.writers.base];
  if (document.getElementById('radio-writer-class').checked) {
    writers.push(json2swift.writers.class);
  }

  if (document.getElementById('radio-writer-nsobject').checked) {
    writers.push(json2swift.writers.class);
    writers.push(json2swift.writers.nsObject);
  }

  if (document.getElementById('radio-writer-argo').checked) {
    writers.push(json2swift.writers.argo);
  }

  if (document.getElementById('radio-writer-unbox').checked) {
    writers.push(json2swift.writers.unbox);
  }

  if (document.getElementById('radio-writer-jsonjoy').checked) {
    writers.push(json2swift.writers.jsonJoy);
  }

  if (document.getElementById('radio-writer-realm').checked) {
    document.getElementById('radio-writer-none').checked = true;
    writers = [json2swift.writers.base, json2swift.writers.realm];
  }

  var allEntities = json2swift.parseDocument(sourceJSON, writers);
  var mapped = allEntities.map(function (e) {
    return '<pre>' +
      '<div class="action-container">' +
        '<button class="action-button copy-button ion-paperclip" data-entity-name="' + e.name + '"></button>' +
        '<button class="action-button save-button ion-ios-download-outline" data-entity-name="' + e.name + '" onclick="javascript:save(this)"></button>' +
      '</div>' +
      '<code class="swift" id="entity-' + e.name + '">' + e.code + '</code>' +
    '</pre>';
  });

  destination.innerHTML = mapped.join('\n');

  var codes = Array.prototype.slice.call(document.getElementsByTagName('code'));
  codes.forEach(function (c) {
    hljs.highlightBlock(c);
  });
}
