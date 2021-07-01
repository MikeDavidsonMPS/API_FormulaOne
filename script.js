const baseURL = "http://ergast.com/api/f1.json";
let url;

//*SEARCH ENGINE
const raceSeason = document.querySelector(".race_season");
const raceYear = document.querySelector(".race_year");
const raceMouth = document.querySelector(".race_month");
const countrySearch = document.querySelector(".counrty_search");
const raceName = document.querySelector(".race_name");
const raceLocation = document.querySelector("race_location");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");
//*Result Navigation
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");
//*RESULTS SECTION
const section = document.querySelector("section");
nav.style.display = "none";
let pageNumber = 0;

//console.log("PageNumber:", pageNumber);
searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);

function fetchResults(u) {
  //console.log(u);
  u.preventDefault();
  url = `${baseURL}?api&page=${pageNumber}&q=${raceSeason.value}`;
  //console.log("URL:", url);
  if (raceYear.value !== "") {
    console.log(raceYear.value);
    url += "&year=" + raceYear.value;
    console.log("URL:", url);
  }
  if (raceMouth.value !== "") {
    console.log(raceName.value);
    url += "&month=" + raceMouth.value;
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
  }
  fetch(url)
    .then(function (results) {
      return results.json();
    })
    .then(function (json) {
      console.log(json);
    });
}

function displayResults(json) {
  console.log("Display Results", json);
  // console.log(json.response.docs);
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  let content = json.response.docs;
  // console.log content);
  if (content.length === 0) {
    console.log("No results");
  } else {
    for (let i = 0; i < content.length; i++) {
      // console.log(i);
      let content = document.createElement("table");
      let heading = document.createElement("th");
      let rows = document.createElement("tr");
      let data = document.createElement("td");
      let current = content[i];
      console.log("Current:", current);
      link.href = current.web_url;
      para.textContent = "Keywords: ";
      for (let j = 0; j < current.keywords.length; j++) {
        let span = document.createElement("span");
        span.textContent += current.keywords[j].value + " ";
        para.appendChild(span);
      }
      clearfix.setAttribute("class");
      content.appendChild(table);
      section.appendChild(content);
      // clearfix.style.padding = '50px'
    }
  }
  if (content.length === 10) {
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
