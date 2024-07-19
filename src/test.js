function downloadImg(src, title) {
  let img = new Image();
  img.src = src;
  img.setAttribute("crossOrigin", "anonymous");
  img.onload = () => {
    let ele = document.createElement("canvas");
    ele.width = img.width;
    ele.height = img.height;
    let a = document.createElement("a");
    a.download = title;
    a.href = ele.toDataURL("image/png");
    a.click();
  };
}
