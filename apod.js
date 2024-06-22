// apod generator
const APIKey = `your-api-key`;
// html vars
const dateText = document.querySelector(".date-text");
const imageTitle = document.querySelector(".image-title");
const copyrightLabel = document.querySelector(".copyright-label");
const imageHtml = document.querySelector(".image-object"); /* image element */
const paraDescription = document.querySelector(".text-contents");
const apodLink = document.querySelector(".apod-link");


async function getData()    {
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}`;    // the url
    const fetchedData = await fetch(URL);     // get Promise response
    return await fetchedData.json();        // return a json response
}

/* render the html page in real time*/
async function renderPage()   {
    const jsonResponse = await getData();         // returns a promise
    const responseObject = JSON.parse(JSON.stringify(jsonResponse));
    
    // object containing data
    const jsDataContainer = {
        copyright: responseObject["copyright"], releaseData: responseObject["date"],
        explanation: responseObject["explanation"], image: responseObject["hdurl"],
        title: responseObject["title"]
    };

    const { copyright, releaseData, 
        explanation, image, title } = jsDataContainer;   // destructuring object
    
    dateText.innerText = `${releaseData}`;
    paraDescription.innerText = `${explanation}`;
    imageTitle.innerText = `${title}`;
    imageHtml.src = `${image}`;
    copyrightLabel.innerHTML = `&copy; ${copyright} (NASA)`;
    apodLink.href = `${image}`;
}


setInterval(renderPage, 20000);

