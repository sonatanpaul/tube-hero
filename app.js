function removeActiveButton() {
  const allActiveButton = document.getElementsByClassName("active");
  for (const active of allActiveButton) {
    active.classList.remove("active");
  }
}

removeActiveButton();

function loadData() {
  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //   convert promise to json
    .then((response) => response.json())
    //   send data to display
    .then((data) => displayCategory(data.categories));
}

function displayCategory(categories) {
  const categoryContainer = document.getElementById("category-container");
  categories.map((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id="btn-${category.category_id}" onclick="categoryVideo(${category.category_id})" class="btn  hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
}

const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      const allButton = document.getElementById("all-button");
      removeActiveButton();
      allButton.classList.add("active");
      displayVideos(data.videos);
    });
};

const displayVideos = (videos) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = null;
  if (videos.length === 0) {
    cardContainer.innerHTML = `
    <p class="text-center text-2xl col-span-4 py-10">There is no Content</p>
    `;
  }

  videos.forEach((video) => {
    // create element
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="card bg-base-100 px-2 shadow-sm">
          <figure>
              <img class="w-full h-[250px] object-cover"
              src=${video.thumbnail}
              alt=${video.title}/>
          </figure>
          <div class="flex items-center gap-8 py-5">
              <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-18 rounded-full ring ring-offset-2">
                    <img  src=${video.authors[0].profile_picture} />
                </div>
              </div>
              <div class="space-y-1">
                 <h1 class="text-xl">${video.title}</h1>
                 <p class="text-gray-500">${video.authors[0].profile_name}</p>
                 <p class="text-gray-500">${video.others.views} views</p>
              </div>
          </div>
  </div>
      `;
    cardContainer.appendChild(cardDiv);
  });
};

const categoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const buttonClick = document.getElementById(`btn-${id}`);
      removeActiveButton();
      buttonClick.classList.add("active");
      displayVideos(data.category);
    });
};

loadData();
loadVideo();
