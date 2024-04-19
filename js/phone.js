const loadPhones = async (searchText='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    const page404 = document.getElementById('page-404');
    const fullBg = document.getElementById('full-bg');
    const headerTitle = document.getElementById('header-title');
    if(phones < 1){
        page404.classList.remove('hidden');
        fullBg.classList.add('dark:bg-gray-900', 'h-screen');
        headerTitle.classList.add('text-white');
    }
    else{
        page404.classList.add('hidden');
        fullBg.classList.remove('dark:bg-gray-900', 'h-screen');
        headerTitle.classList.remove('text-white');
    }

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
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-info text-white">Show Details</button>
          </div>
        </div>
        `;
        phonesContainer.appendChild(phoneCard);
    });
    loadingSpinner(false);
}

const handleSearchPhones = (isShowAll) => {
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, isShowAll);
}

const showAllPhones = () => {
    handleSearchPhones(true);
}

const loadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const loadPhoneDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    showPhoneDetails(phoneDetails);
}

const showPhoneDetails = (phoneDetails) => {
    const getTheModalContentContainer = document.getElementById('phone-content-container');
    getTheModalContentContainer.innerHTML = `
        <img class='w-1/2 mx-auto py-4' src="${phoneDetails.image}" alt="${phoneDetails.name}" />
        <h3 class="font-bold text-3xl">${phoneDetails.name}</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
        <p><strong>Storage :</strong> ${phoneDetails?.mainFeatures?.storage}</p>
        <p><strong>Display Size :</strong> ${phoneDetails?.mainFeatures?.displaySize}</p>
        <p><strong>Chipset :</strong> ${phoneDetails?.mainFeatures?.chipSet}</p>
        <p><strong>Memory :</strong> ${phoneDetails?.mainFeatures?.memory}</p>
        <p><strong>Slug :</strong> ${phoneDetails?.slug}</p>
        <p><strong>Release Data :</strong> ${phoneDetails?.releaseDate}</p>
        <p><strong>Brand :</strong> ${phoneDetails?.brand}</p>
        <p><strong>GPS :</strong> ${phoneDetails?.others?.GPS}</p>
    `;
    my_modal_1.showModal();
}

loadPhones();