const loadPhones = async (searchText='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    const phonesContainer = document.getElementById('phones-container');

    phonesContainer.textContent = '';

    const showAllPhonesContainer = document.getElementById('show-all-phones-container');

    if(phones.length > 12 && !isShowAll){
        showAllPhonesContainer.classList.remove('hidden');
    }
    else{
        showAllPhonesContainer.classList.add('hidden');
    }
    
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl pt-8`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="${phone.phone_name}" /></figure>
        <div class="card-body flex items-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <h2 class="card-title">$999</h2>
          <div class="card-actions justify-end">
            <button class="btn btn-info text-white">Show Details</button>
          </div>
        </div>
        `;
        phonesContainer.appendChild(phoneCard);
    });
}

const handleSearchPhones = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, isShowAll);
}

const showAllPhones = () => {
    handleSearchPhones(true);
}

loadPhones();