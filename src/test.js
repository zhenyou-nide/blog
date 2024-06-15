const btn = document.querySelector("button");

function handleClick1() {
  console.log("click 1");
}
function handleClick2() {
  console.log("click 2");
}

btn.addEventListener("click", handleClick1);
btn.addEventListener("click", handleClick2);
