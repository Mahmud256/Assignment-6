const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const tabContainer = document.getElementById("tab-container");

    const sortContainer = document.getElementById("sort-container");

    const trimeData = data.data;
    console.log(trimeData);
    
    trimeData.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `<button onclick="handleButton('${category.category_id}')" class="btn normal-case">${category.category}</button>`;
        tabContainer.appendChild(div);
    });


    
    
        const div = document.createElement("div");
        div.innerHTML = `<button onclick="handleSort()" class="btn normal-case">Sort by view</button>`;
        sortContainer.appendChild(div);
    
    
};

const handleButton = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const oopsContainer = document.getElementById("oops-container");
    oopsContainer.innerHTML = "";

    const trimeData = data.data;
    
    if (trimeData.length === 0) {
        // Handle the case when there are no videos
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex flex-col items-center gap-3">
            <img src="./icon/Icon.png" alt="" srcset="">
            <h1 class="text-xl md:text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
        </div>`;
        oopsContainer.appendChild(div);
    } 
    else {
        trimeData.forEach((videos) => {
            const div = document.createElement("div");
            // Calculate hours and minutes
            const totalSeconds = videos.others.posted_date;
            const hours = Math.floor(totalSeconds / 3600);
            const remainingSeconds = totalSeconds % 3600;
            const minutes = Math.floor(remainingSeconds / 60);
            
            div.innerHTML = `
            <div class="gallery h-40">
                <figure>
                    <img src=${videos?.thumbnail} class="rounded-md h-40 w-72">
                </figure>
                <h2 class="profile-times relative w-[180px] top-[-27px] left-[94px] rounded-md text-center bg-[#171717] text-[#fff]">${hours} hrs ${minutes} min ago</h2>
            </div>
            <div class="card-body p-0">
                <div class="profile-container flex m-3 gap-3">
                    <div class="profile-img flex">
                        <figure><img src=${videos.authors[0].profile_picture} class="h-12 w-12 rounded-full"></figure>
                    </div>
                    <div class="profile-description flex flex-col">
                        <h2 class="videos-title text-base font-bold">${videos.title}</h2>
                        <div class="nv flex justify-between gap-1">
                            <h2 class="profile-name">${videos.authors[0].profile_name}</h2>
                            <h2 class="profile-verified">
                                ${videos.authors[0].verified ? '<img src="./icon/fi_10629607.svg" alt="" srcset="">' : ''}
                            </h2>
                        </div>
                        <h2 class="profile-views">${videos.others.views} views</h2>
                    </div>
                </div>
            </div>`;
            cardContainer.appendChild(div);
        });
    }

};

const handleSort = async (sortId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${sortId}`);
    const data = await res.json();

    const cardContainer = document.getElementById("card-container");

    const trimeData = data.data;
    //console.log(trimeData);

    
    const viewsArray = [];

trimeData.forEach((videos) => {

    
    const view = parseFloat(videos.others.views);
    viewsArray.push(view);
});

viewsArray.sort((a, b) => a - b);
console.log(viewsArray);

//cardContainer.appendChild(viewsArray);

};




handleCategory();
handleButton("1000");
handleSort("1000");

