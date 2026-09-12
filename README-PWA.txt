HILEX PWA INSTALL KIT

1. Upload these files/folders to the ROOT of your GitHub repository:
   manifest.webmanifest
   sw.js
   offline.html
   images/icons/icon-192.png
   images/icons/icon-512.png
   images/icons/apple-touch-icon.png

2. In index.html, inside <head>, add:

<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0D5242">
<link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png">

3. Just before </body> in index.html, add:

<script>
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
</script>

4. Commit the changes to main. Wait for GitHub Pages deployment.

5. On Android Chrome:
   Open https://hilexdigital.co.zw
   Menu ⋮ → Add to Home screen / Install app

6. On desktop Chrome/Edge:
   Open https://hilexdigital.co.zw
   Look for the install icon in the address bar or use the browser menu → Install HILEX.

If you later change important cached files and users keep seeing old content,
change CACHE_NAME in sw.js from hilex-v1 to hilex-v2.
