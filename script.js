const giphyUrl = "https://api.giphy.com/v1/gifs/search";
const randomUrl = "https://api.giphy.com/v1/gifs/random";
const nasaUrl = "https://api.nasa.gov/planetary/apod";

//NASA Key
const nasaKey = "ihsCPXbr1PJhfBa0E1LxYPm8JTPO47MHYnJIPZoL";
// https://api.nasa.gov/planetary/apod?api_key=ihsCPXbr1PJhfBa0E1LxYPm8JTPO47MHYnJIPZoL

//GIPHY
const giphyKey = "PTLC7ZDm9F2tmGu6RcCS3KK4DGxFflF9";

let url;

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const body = document.querySelector('body');

// NASA
function findNASA(e) {
    console.log(e);
    url = `${nasaUrl}?api_key=${nasaKey}`;
    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json()
        }) 
        .then(function (json) {
            // console.log(json);
            background(json);
        })
}

let background = json => {
    console.log(json)
    if (json.media_type !== "video") {
        body.style = "background-image: url('')";
    } else {
        let urlTwo = `${url}&q=`
    }
}

searchForm.addEventListener('submit', findGiphy)

function findGiphy(e) {
    // console.log(e);
    e.preventDefault();
    let giphy = searchTerm.value;
    url = `${giphyUrl}?api_key=${giphyKey}&q=${giphy}`;
    // console.log(url);
    if (giphy.length == 0) {
        let url = `${randomUrl}?api_key=${giphyKey}&q=${giphy}`;
        fetch(url)
        .then(function (response) {
            return response.json()
        }) 
        .then(function (json) {
            // console.log(json);
            displayRandomResults(json);
        })
    } else {
        fetch(url)
        .then(function (response) {
            return response.json()
        }) 
        .then(function (json) {
            // console.log(json);
            displaySearchResults(json);
        })
    }
}

let displayRandomResults = json => {
    console.log(json);
    if (json == undefined || json.data.rating !== "g") {
    // if(json.meta.response_id == '""' || json.data.rating !== "g") { // was randomly returning undefined and no img so this is to check that there is somethig to navigate into & this it to only return gifs with a rating of "g". if it is a different rating then move onto the last part
        findGiphy();
    } else {
        let randomGIF = document.getElementById('results');
        randomGIF.innerHTML = `</br><a href="${json.data.image_mp4_url}" target="blank" id="link">GIF Source Link</a></br></br></br><a href="${json.data.image_mp4_url}" target="blank"><img src="${json.data.image_url}" id="img"></a>`;
    }
    
    // let randomGIF = document.getElementById('results');
    // randomGIF.innerHTML = `<a href="${json.data.image_mp4_url}" target="blank" id="link">${json.data.image_mp4_url}</a></br></br></br><img src="${json.data.image_url}" id="img">`;
}

let displaySearchResults = json => {
    // console.log(json);

    function getRandom(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    let number = getRandom(50);
    
    let searchGIF = document.getElementById('results');
    searchGIF.innerHTML = `</br><a href="${json.data[number].url}" target="blank" id="link">GIF Source Link</a></br></br></br><a href="${json.data[number].url}" target="blank"><img src="${json.data[number].images.original.url}" id="img"></a>`;
}