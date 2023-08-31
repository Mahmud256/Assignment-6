const handleCategory = async () => {
    const res = await fetch(" https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    const tabContainer = document.getElementById("tab-container");

    const trimeData = data.data;
    trimeData.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `<button onclick = "handleButton('${category.category_id}')" class="btn normal-case">${category.category}</button>`

        tabContainer.appendChild(div);
    });

};

const handleButton = async(categoryId) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    
    const cardContainer = document.getElementById("card-container");
   
    const trimeData = data.data;

    trimeData.forEach((videos) => {
        
        const div = document.createElement("div");
        div.innerHTML = `
        <figure><img src=${videos?.thumbnail}/></figure>
                    <div class="card-body">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>`;

        cardContainer.appendChild(div);

    });

};

handleCategory();
handleButton();