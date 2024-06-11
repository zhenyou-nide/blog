const xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.send();
