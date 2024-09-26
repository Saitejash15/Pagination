const mainSection = document.getElementById('data-list-wrapper');
const paginationWrapper = document.getElementById('pagination-wrapper');
const limit = 10; 
let currentPage = 1; 

function fetchAndRenderUsers(pageNumber, limit) {
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageNumber}`)
    .then((res) => {
      const totalPosts = res.headers.get('X-Total-Count');
      const totalButtons = Math.ceil(totalPosts / limit);
      renderPagination(totalButtons, pageNumber);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      mainSection.innerHTML = null; 
      appendingCardList(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

fetchAndRenderUsers(currentPage, limit);

function appendingCardList(data) {
  const cardList = document.createElement('div');
  cardList.classList.add('card-list');
  
  data.forEach((item) => {
    let card = getCard(item.id, item.title, item.body);
    cardList.append(card);
  });

  mainSection.append(cardList); 
}

function getCard(userId, title, body) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', userId);
  
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('div');
  cardTitle.classList.add('card-item', 'card-title');
  cardTitle.innerText = title;

  const cardDescription = document.createElement('div');
  cardDescription.classList.add('card-item', 'card-description');
  cardDescription.innerText = body;

  cardBody.append(cardTitle, cardDescription);
  card.append(cardBody);
  
  return card; 
}

function renderPagination(totalButtons, pageNumber) {
  paginationWrapper.innerHTML = ''; 

  
  const prevButton = document.createElement('button');
  prevButton.innerText = 'Previous';
  prevButton.disabled = pageNumber === 1; // Disable on the first page
  prevButton.onclick = () => fetchAndRenderUsers(pageNumber - 1, limit);
  paginationWrapper.appendChild(prevButton);

  
  for (let i = 1; i <= totalButtons; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.disabled = (i === pageNumber); 
    button.onclick = () => fetchAndRenderUsers(i, limit);
    paginationWrapper.appendChild(button);
  }

  
  const nextButton = document.createElement('button');
  nextButton.innerText = 'Next';
  nextButton.disabled = pageNumber === totalButtons; 
  nextButton.onclick = () => fetchAndRenderUsers(pageNumber + 1, limit);
  paginationWrapper.appendChild(nextButton);
}
