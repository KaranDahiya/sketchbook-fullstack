AOS.init();

const artColumns = document.querySelectorAll('.col-lg');
const loader = document.querySelector('.loader');
let artwork = [];

async function fetchArtwork() {
    const response = await fetch('/artworks');
    artwork = await response.json();
}

async function createDOM (category) {
    
    // remove all current art
    for(let i = 0; i < 3; i++) {
        while(artColumns[i].firstChild) {
            artColumns[i].removeChild(artColumns[i].firstChild);
        }
    }

    // create DOM elements
    let columnCounter = 0;
    let artCounter = 0; 

    // sort artworks by newest to oldest
    if (artwork[0].title == "caribou") {
        artwork.reverse()
    }

    for (art of artwork) {

        // filter by category
        if(art.category == category || category == 'all') {
            
            // date
            const cardText = document.createElement('p');
            cardText.setAttribute('class', 'card-text');
            cardText.innerHTML = art.date.replaceAll('-', ' / ');

            // image & modal link
            const cardImage = document.createElement('img');
            cardImage.setAttribute('class', 'card-img modal-content');
            cardImage.setAttribute('src', art.imageURL);

            // art link
            const modalLink = document.createElement('a');
            modalLink.setAttribute('href', art.imageURL);
            modalLink.setAttribute('data-toggle', 'modal');
            modalLink.setAttribute('data-target', '#imageModal');

            // title
            const cardTitle = document.createElement('p');
            cardTitle.setAttribute('class', 'card-title');
            cardTitle.innerHTML = art.title;

            // card
            const cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            const cardHeader = document.createElement('header');
            cardHeader.setAttribute('class', 'card-header');
            const cardArticle = document.createElement('article');
            cardArticle.setAttribute('class', 'card mb-4');

            if (artCounter % 2 == 0) {
                cardImage.setAttribute('style', 'height: 300px;object-fit: cover;');
            } else {
                cardImage.setAttribute('style', 'height: 600px;object-fit: cover;')
            }

            // assemble card DOM elements
            cardBody.appendChild(cardText);
            cardHeader.appendChild(cardTitle);
            modalLink.appendChild(cardImage);
            cardArticle.appendChild(cardHeader);
            cardArticle.appendChild(modalLink);
            cardArticle.appendChild(cardBody);

            // add cards to DOM
            artColumns[columnCounter].appendChild(cardArticle);
            if (columnCounter == 2)
                columnCounter = 0;
            else 
                columnCounter++;
            artCounter++;
        }
    }

    // get source from image on click
    const images = document.querySelectorAll('.card-img');
    images.forEach(element => {
        element.addEventListener('click', event => {
            source = element.getAttribute('src');
        });
    });

    // add scrolling animations
    const articles = document.querySelectorAll('article');
    articles.forEach(element => {
        element.setAttribute('data-aos', 'fade-up');
        element.setAttribute('data-aos-duration', '2000');
    });
}

// filter artwork by category - all
const noFilter = document.getElementById('noFilter');
noFilter.addEventListener('click', event => {
    // load all art
    loadArt('all');
});

// filter artwork by category - figure
const figureFilter = document.getElementById('figureFilter');
figureFilter.addEventListener('click', event => {
    // load filtered art
    loadArt('figure');
});

// filter artwork by category - portrait
const portraitFilter = document.getElementById('portraitFilter');
portraitFilter.addEventListener('click', event => {
    // load filtered art
    loadArt('portrait');
});

// filter artwork by category - animal
const animalFilter = document.getElementById('animalFilter');
animalFilter.addEventListener('click', event => {
    // load filtered art
    loadArt('animal');
});

// filter artwork by category - landscape
const landscapeFilter = document.getElementById('landscapeFilter');
landscapeFilter.addEventListener('click', event => {
    // load filtered art
    loadArt('landscape');
});

// set correct image in modal
let source;
const modalImage = document.querySelector('#modalImage');


// show modal when image clicked
$(".modal").on('show.bs.modal', () => {
    modalImage.setAttribute('src', source);
});

async function loadArt(category) {

    // retreive artwork from server if needed and create DOM using them
    if (artwork.length == 0) {

        // show spinner
        loader.style.display = 'block';

        fetchArtwork().then(() => {
            createDOM(category);
            
            // hide spinner
            loader.style.display = 'none';
        });
    } else {
        createDOM(category);
    }
}

// on initial load
loadArt('all');