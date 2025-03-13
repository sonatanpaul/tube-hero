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
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
}
const displayVideos = (videos) => {
  const cardContainer = document.getElementById("card-container");
  videos.forEach((video) => {
    // create element
    console.log(video);
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="card bg-base-100  shadow-sm">
        <figure>
            <img
            src=${video.thumbnail}
            alt=${video.title}/>
        </figure>
        <div class="card-body">
            <h2 class="card-title">${video.title}</h2>
            <p>${video.description.slice(0, 200)}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
</div>
    `;
    cardContainer.appendChild(cardDiv);
  });
};

const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
};

loadData();
loadVideo();
