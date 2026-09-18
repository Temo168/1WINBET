const DEFAULT_BALANCE = 10000;

function getBalance(){

  const saved =
    localStorage.getItem("winbet_balance");

  if(saved === null){

    localStorage.setItem(
      "winbet_balance",
      DEFAULT_BALANCE
    );

    return DEFAULT_BALANCE;
  }

  return Number(saved);

}

function setBalance(value){

  localStorage.setItem(
    "winbet_balance",
    Math.max(0,value)
  );

  updateBalanceDisplays();

}

function updateBalanceDisplays(){

  const balance = getBalance();

  document.querySelectorAll("#balance").forEach(el=>{
    el.textContent = balance.toLocaleString();
  });

}

function addHistory(type,title,amount){

  const history =
    JSON.parse(
      localStorage.getItem("winbet_history") || "[]"
    );

  history.push({

    type,
    title,
    amount,
    time:new Date().toLocaleString()

  });

  localStorage.setItem(
    "winbet_history",
    JSON.stringify(history.slice(-100))
  );

}

function showToast(message){

  let toast = document.getElementById("toast");

  if(!toast){

    toast = document.createElement("div");

    toast.id = "toast";
    toast.className = "toast";

    document.body.appendChild(toast);

  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(()=>{
      toast.classList.remove("show");
    },2200);

}

document.addEventListener(
  "DOMContentLoaded",
  updateBalanceDisplays
);
