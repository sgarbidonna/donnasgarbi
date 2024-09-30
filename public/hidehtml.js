
if (window.location.pathname.endsWith('.html')) {
    window.history.replaceState(null, null, window.location.pathname.replace('.html', ''));
}
