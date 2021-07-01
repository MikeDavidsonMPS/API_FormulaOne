const baseURL = "http://ergast.com/api/f1/seasons.json";
let url;

//*SEARCH ENGINE:querySelectors
const raceSeasons = document.querySelector(".race_season");
const raceMonth = document.querySelector(".race_month");
const countrySearch = document.querySelector(".country_search");
const raceName = document.querySelector(".race_name");
const raceLocation = document.querySelector(".race_location");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
//*Result Navigation
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");
//*Results Section:
const section = document.querySelector("section");
nav.style.display = "none";
let pageNumber = 0;

//*EventListener:
searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);

function fetchResults(u) {
  //console.log(u);
  u.preventDefault();
  url = `${baseURL}?callback=${raceSeasons.value}`;
  //console.log("URL:", url);
  /*if (raceMonth.value !== "") {
    console.log(raceMonth.value);
    url += "&month=" + raceMonth.value;
    console.log("URL:", url);
  }
  if (countrySearch.value !== "") {
    console.log(countrySearch.value);
    url += "&country=" + countrySearch.value;
    console.log("URL:", url);
  }
  if (raceName.value !== "") {
    console.log(raceName.value);
    url += "&name=" + raceName.value;
    console.log("URL:", url);
  }
  if (raceLocation.value !== "") {
    console.log(raceLocation.value);
    url += "&location=" + raceLocation.value;
    console.log("URL:", url);
  }*/
  fetch(url)
    .then(function (results) {
      console.log(results.json());
    })
    .then(function (json) {
      //console.log(json);
      displayResults(json);
    });
}

function displayResults(json) {
  console.log("Display Results", json);
  //console.log(json.response.docs);
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  let resultData = json.response.docs;
  console.log(resultData);
  if (resultData.length === 0) {
    console.log("No results");
  } else {
    for (let i = 0; i < resultData.length; i++) {
      // console.log(i);
      let resultData = document.createElement("resultData");
      //let heading = document.createElement("th");
      //let rows = document.createElement("tr");
      //let data = document.createElement("td");
      let retrievedData = resultData[i];
      console.log("Search Results:", retrievedData);

      resultData.appendChild(DataTransferItem);
      section.appendChild(resultData);
    }
  }
  if (resultData.length === 10) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }
}

function nextPage(u) {
  //console.log("next button clicked");
  pageNumber++;
  fetchResults(u);
  console.log("Page Number:", pageNumber);
}

function previousPage(u) {
  //console.log("previous button clicked");
  if (pageNumber > 0) {
    pageNumber--;
    //fetchResults(u);
  } else {
    return;
  }
  fetchResults(u);
  console.log("Page:", pageNumber);
}
