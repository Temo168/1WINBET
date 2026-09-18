const matches = [

{
 id:1,
 sport:"football",
 league:"Premier League",
 status:"LIVE",
 time:"62'",
 home:"Manchester City",
 away:"Liverpool",
 score:"1 - 0",
 markets:[
  ["1X2","Man City","1.82","Draw","3.75","Liverpool","4.25"],
  ["Over/Under","Over 2.5","1.72","Under 2.5","2.05","Over 3.5","2.55"],
  ["BTTS","Yes","1.61","No","2.20","",""]
 ]
},

{
 id:2,
 sport:"football",
 league:"La Liga",
 status:"LIVE",
 time:"74'",
 home:"Barcelona",
 away:"Real Madrid",
 score:"2 - 1",
 markets:[
  ["1X2","Barcelona","2.15","Draw","3.60","Real Madrid","2.90"],
  ["Over/Under","Over 2.5","1.44","Under 2.5","2.70","Over 3.5","2.05"],
  ["BTTS","Yes","1.48","No","2.45","",""]
 ]
},

{
 id:3,
 sport:"football",
 league:"Bundesliga",
 status:"20:30",
 time:"Today",
 home:"Bayern Munich",
 away:"Dortmund",
 score:"-",
 markets:[
  ["1X2","Bayern","1.70","Draw","4.20","Dortmund","4.40"],
  ["Over/Under","Over 2.5","1.55","Under 2.5","2.30","Over 3.5","2.10"],
  ["BTTS","Yes","1.62","No","2.12","",""]
 ]
},

{
 id:4,
 sport:"football",
 league:"Champions League",
 status:"21:00",
 time:"Today",
 home:"Inter Milan",
 away:"PSG",
 score:"-",
 markets:[
  ["1X2","Inter","2.40","Draw","3.40","PSG","2.65"],
  ["Over/Under","Over 2.5","1.82","Under 2.5","1.95","Over 3.5","2.70"],
  ["BTTS","Yes","1.67","No","2.05","",""]
 ]
},

{
 id:5,
 sport:"basketball",
 league:"NBA",
 status:"LIVE",
 time:"Q3 04:21",
 home:"Lakers",
 away:"Warriors",
 score:"71 - 68",
 markets:[
  ["Winner","Lakers","1.78","Warriors","2.15","",""],
  ["Total","Over 220.5","1.90","Under 220.5","1.90","",""],
  ["Handicap","Lakers -3.5","1.95","Warriors +3.5","1.85","",""]
 ]
},

{
 id:6,
 sport:"basketball",
 league:"NBA",
 status:"19:30",
 time:"Today",
 home:"Celtics",
 away:"Bulls",
 score:"-",
 markets:[
  ["Winner","Celtics","1.45","Bulls","2.80","",""],
  ["Total","Over 215.5","1.88","Under 215.5","1.92","",""],
  ["Handicap","Celtics -5.5","1.90","Bulls +5.5","1.90","",""]
 ]
},

{
 id:7,
 sport:"tennis",
 league:"ATP Tour",
 status:"LIVE",
 time:"Set 2",
 home:"Carlos Martin",
 away:"Alex Novak",
 score:"1 - 0",
 markets:[
  ["Winner","Martin","1.65","Novak","2.35","",""],
  ["Games","Over 22.5","1.88","Under 22.5","1.88","",""],
  ["Set Winner","Martin","1.55","Novak","2.45","",""]
 ]
},

{
 id:8,
 sport:"tennis",
 league:"WTA",
 status:"18:00",
 time:"Today",
 home:"Sofia Lee",
 away:"Emma Wilson",
 score:"-",
 markets:[
  ["Winner","Lee","1.90","Wilson","1.90","",""],
  ["Games","Over 21.5","1.85","Under 21.5","1.95","",""],
  ["Set Winner","Lee","1.80","Wilson","2.00","",""]
 ]
}

];

let selected = [];

let activeFilter = "all";
let activeSport = "all";
let activeLeague = null;

function renderMatches(){

  const list =
    document.getElementById("matchList");

  const search =
    document
      .getElementById("matchSearch")
      .value
      .toLowerCase();

  const filtered = matches.filter(match=>{

    const searchOK =
      match.home.toLowerCase().includes(search) ||
      match.away.toLowerCase().includes(search) ||
      match.league.toLowerCase().includes(search);

    let filterOK = true;

    if(activeFilter === "live"){
      filterOK = match.status === "LIVE";
    }

    if(activeFilter === "football"){
      filterOK = match.sport === "football";
    }

    if(activeFilter === "basketball"){
      filterOK = match.sport === "basketball";
    }

    if(activeFilter === "tennis"){
      filterOK = match.sport === "tennis";
    }

    if(activeSport !== "all"){
      filterOK = match.sport === activeSport;
    }

    if(activeLeague){
      filterOK = match.league === activeLeague;
    }

    return searchOK && filterOK;

  });

  if(!filtered.length){

    list.innerHTML = `
      <div class="slip-empty">
        <div>🔎</div>
        <p>No matches found.</p>
      </div>
    `;

    return;
  }

  list.innerHTML =
    filtered.map(createMatchHTML).join("");

}

function createMatchHTML(match){

  const markets =
    match.markets.map(market=>{

      let odds = "";

      for(let i=1;i<market.length;i+=2){

        if(!market[i]) continue;

        const name = market[i];
        const odd = market[i+1];

        const isSelected =
          selected.some(
            item =>
              item.matchId === match.id &&
              item.market === market[0] &&
              item.name === name
          );

        odds += `
          <button
            class="odd ${isSelected ? "selected":""}"
            onclick="addSelection(
              ${match.id},
              '${market[0]}',
              '${name}',
              ${odd}
            )"
          >
            <span>${name}</span>
            <strong>${odd}</strong>
          </button>
        `;

      }

      return `
        <div class="market">
          <div class="market-name">${market[0]}</div>
          ${odds}
        </div>
      `;

    }).join("");

  return `
    <article class="match-card">

      <div class="match-header">

        <span class="league">
          ${match.sport === "football" ? "⚽" :
            match.sport === "basketball" ? "🏀" : "🎾"}
          ${match.league}
        </span>

        <span class="match-live">
          ${match.status === "LIVE"
            ? "🔴 LIVE " + match.time
            : match.status}
        </span>

      </div>

      <div class="match-content">

        <div class="match-teams">

          <div class="team">${match.home}</div>

          <div class="match-score">
            ${match.score}
            ${match.status === "LIVE"
              ? "<small>LIVE</small>"
              : ""}
          </div>

          <div class="team away">${match.away}</div>

        </div>

        ${markets}

      </div>

    </article>
  `;

}

function addSelection(matchId,market,name,odd){

  const match =
    matches.find(m=>m.id === matchId);

  const existing =
    selected.findIndex(
      item =>
        item.matchId === matchId &&
        item.market === market
    );

  if(existing >= 0){

    if(selected[existing].name === name){

      selected.splice(existing,1);

    }else{

      selected[existing] = {
        matchId,
        market,
        name,
        odd,
        home:match.home,
        away:match.away,
        league:match.league
      };

    }

  }else{

    selected.push({
      matchId,
      market,
      name,
      odd,
      home:match.home,
      away:match.away,
      league:match.league
    });

  }

  renderMatches();
  renderSlip();

}

function renderSlip(){

  const selections =
    document.getElementById("slipSelections");

  const empty =
    document.getElementById("slipEmpty");

  const summary =
    document.getElementById("slipSummary");

  document.getElementById("selectionCount")
    .textContent = `(${selected.length})`;

  if(selected.length === 0){

    selections.innerHTML = "";
    empty.classList.remove("hidden");
    summary.classList.add("hidden");

    return;

  }

  empty.classList.add("hidden");
  summary.classList.remove("hidden");

  selections.innerHTML =
    selected.map((item,index)=>`

      <div class="slip-selection">

        <button onclick="removeSelection(${index})">×</button>

        <small>${item.league}</small>

        <strong>${item.home} vs ${item.away}</strong>

        <em>${item.market} · ${item.name}</em>

        <strong>@ ${item.odd}</strong>

      </div>

    `).join("");

  document.getElementById("selectionNumber")
    .textContent = selected.length;

  updateOdds();

}

function updateOdds(){

  if(selected.length === 0) return;

  const combined =
    selected.reduce(
      (total,item)=>total * Number(item.odd),
      1
    );

  document.getElementById("combinedOdds")
    .textContent = combined.toFixed(2);

  updatePotential();

}

function updatePotential(){

  const stake =
    Number(
      document.getElementById("stakeInput").value
    ) || 0;

  const combined =
    selected.reduce(
      (total,item)=>total * Number(item.odd),
      1
    );

  document.getElementById("potentialReturn")
    .textContent =
    (stake * combined).toFixed(2);

}

function removeSelection(index){

  selected.splice(index,1);

  renderMatches();
  renderSlip();

}

document
  .getElementById("clearSlip")
  .addEventListener("click",()=>{

    selected = [];

    renderMatches();
    renderSlip();

  });

document
  .getElementById("stakeInput")
  .addEventListener("input",updatePotential);

document.querySelectorAll(".quick-money button")
  .forEach(button=>{

    button.addEventListener("click",()=>{

      document.getElementById("stakeInput").value =
        button.dataset.stake;

      updatePotential();

    });

  });

document
  .getElementById("placeBet")
  .addEventListener("click",()=>{

    if(selected.length === 0){

      showToast("Select at least one market.");
      return;

    }

    const stake =
      Number(
        document.getElementById("stakeInput").value
      );

    if(!stake || stake <= 0){

      showToast("Enter a valid stake.");
      return;

    }

    const balance = getBalance();

    if(stake > balance){

      showToast("Insufficient demo balance.");
      return;

    }

    setBalance(balance - stake);

    addHistory(
      "bet",
      `${selected.length} selection accumulator`,
      -stake
    );

    selected = [];

    renderMatches();
    renderSlip();

    showToast(
      `Demo bet placed for ${stake.toLocaleString()} VC`
    );

  });

document
  .getElementById("matchSearch")
  .addEventListener("input",renderMatches);

document.querySelectorAll(".market-filter")
  .forEach(button=>{

    button.addEventListener("click",()=>{

      document
        .querySelectorAll(".market-filter")
        .forEach(b=>b.classList.remove("active"));

      button.classList.add("active");

      activeFilter =
        button.dataset.filter;

      activeSport = "all";
      activeLeague = null;

      renderMatches();

    });

  });

document.querySelectorAll(".sport-filter")
  .forEach(button=>{

    button.addEventListener("click",()=>{

      document
        .querySelectorAll(".sport-filter")
        .forEach(b=>b.classList.remove("active"));

      button.classList.add("active");

      activeSport =
        button.dataset.sport;

      activeFilter = "all";
      activeLeague = null;

      renderMatches();

    });

  });

document.querySelectorAll(".league-filter")
  .forEach(button=>{

    button.addEventListener("click",()=>{

      activeLeague =
        button.dataset.league;

      activeSport = "all";
      activeFilter = "all";

      renderMatches();

      showToast(
        `${activeLeague} selected`
      );

    });

  });

renderMatches();
renderSlip();
