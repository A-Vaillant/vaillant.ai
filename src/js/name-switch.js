(function () {
  var params = new URLSearchParams(location.search);
  var cfg = params.get('a');
  if (!cfg || parseInt(cfg) !== 2) return;

  // Alternate name via charcode — no plaintext in source
  var altFirst = String.fromCharCode(65, 76, 73, 67, 69);
  var altEmail = String.fromCharCode(
    97, 108, 105, 99, 101, 64, 118, 97, 105, 108, 108, 97, 110, 116, 46, 97, 105
  );
  var origFirst = String.fromCharCode(65, 108, 101, 105, 115, 116, 101, 114);
  var origFirstLower = String.fromCharCode(97, 108, 101, 105, 115, 116, 101, 114);

  // Replace name in all data-name elements
  document.querySelectorAll('[data-name]').forEach(function (el) {
    if (el.innerHTML.includes(origFirst.toUpperCase())) {
      el.innerHTML = el.innerHTML.replace(origFirst.toUpperCase(), altFirst.toUpperCase());
    } else if (el.textContent.includes(origFirst)) {
      el.textContent = el.textContent.replace(origFirst, altFirst);
    }
  });

  // Replace email in all data-email elements
  document.querySelectorAll('[data-email]').forEach(function (el) {
    if (el.textContent.includes(origFirstLower)) {
      el.textContent = altEmail;
      if (el.href) el.href = 'mailto:' + altEmail;
    }
  });

  // Propagate ?a=2 to all internal links
  document.querySelectorAll('a[href]').forEach(function (el) {
    var href = el.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    var separator = href.includes('?') ? '&' : '?';
    el.setAttribute('href', href + separator + 'a=' + cfg);
  });
})();
