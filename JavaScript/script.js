const postContainer = document.getElementById("posts-container");
const markedListsEl = document.getElementById('marked-lists');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const latestPostContainer = document.getElementById('latest-posts');
const postLoader = document.getElementById('post-loader');
const latestLoader = document.getElementById('latest-loader');
const markedListPart = document.getElementById('marked-lists-part');
const markCountEl = document.getElementById('mark-count')
let markCount = 0;





// to load all posts
const handleLoad = async () => {
  const postUrl = "https://openapi.programming-hero.com/api/retro-forum/posts";
  const response = await fetch(postUrl);
  const data = await response.json();

  setTimeout(() => {
    hideLoader(postLoader);
    markedListPart.classList.remove('hidden');
    handleDisplay(data.posts);
  }, 2000);
};

// to load data by category
const loadByCategory = async(category)=>{
    // to display loader
    postLoader.classList.remove('hidden');

  const postsUrl = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`;
  const res = await fetch(postsUrl);
  const data = await res.json();
  const posts = data.posts;
  // to empty input field
  searchInput.value = '';

  setTimeout(() => {
    hideLoader(postLoader);
    handleDisplay(posts); 
  }, 2000);
};

// to load latest posts
const loadLatestPost = async() => {
  const latestUrl = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
  const res = await fetch(latestUrl);
  const data = await res.json();

  setTimeout(()=>{
    hideLoader(latestLoader);
    displayLatestPosts(data);
  },2000);
};

// to display posts
const handleDisplay = async (posts) => {
  // to clear before load new data
  postContainer.innerHTML  = '';

  posts.forEach((post) => {
    const {image, isActive, category, author, title, description, comment_count, view_count, posted_time   } = post;

    //formatted title
    const replacedTitle = title.replace("'", "@");
        
    // activation status
    const status = isActive?`<span class="w-4 h-4 bg-[#10B981] rounded-full absolute -top-1 -right-1 border-2 border-white"></span>`:`<span class="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1 border-2 border-white"></span>`;

    const article = document.createElement("article");
    article.classList = `article flex flex-col md:flex-row gap-4 md:gap-6 bg-[#F3F3F5] p-6 hover:bg-[#797dfc1a] rounded-xl md:rounded-2xl shadow-sm hover:shadow-md`;
    article.innerHTML = `
      <div class="relative w-16 h-16">
        <img src=${image} alt="${author.name}" class="w-16 h-16 rounded-xl">
        ${status}
      </div>
              
      <div class="flex-1">
        <div class="flex items-center gap-5 font-inter text-base text-[#12132dcc] font-medium">
          <p># <span>${category}</span></p>
          <p>Author: <span>${author.name}</span></p>
        </div>

        <h4 class="text-xl md:text-2xl font-bold text-[#12132D] mt-3 mb-4">${title}</h4>

        <p class="font-inter border-b border-dashed pb-4 mb-6 text-base md:text-lg">${description}</p>

        <div class="flex justify-between items-center font-inter">
           <div class="flex items-center">
              <img src="./images-&-icons/icon-message-2.svg" alt="" class="mr-2 md:mr-3 h-5 md:h-7">
              <span class="mr-3 md:mr-5">${comment_count}</span>

              <img src="./images-&-icons/icon-eye.svg" alt="" class="mr-2 md:mr-3 h-6 md:h-7">
              <span class="mr-3 md:mr-5">${view_count}</span>

              <img src="./images-&-icons/icon-clock-hour-9.svg" alt="" class="mr-2 md:mr-3 h-5 md:h-7">
              <span class="mr-3 md:mr-5">${posted_time} min</span>
           </div>
           <button onclick="handleMarkedCard('${replacedTitle}','${view_count}')"> <img src="./images-&-icons/envelop-icon.svg" alt="" class="card-mark cursor-pointer hover:opacity-50"></button>
       </div>
      </div>
        `;

        postContainer.appendChild(article);
        
  });
};

// to get input value/ category
searchBtn.addEventListener('click', () => {
  const inputValue = searchInput.value;
  loadByCategory(inputValue);
});

// handle read/marked card 
const handleMarkedCard = (title, views) => {
  // to update mark count
  markCount+=1;
  markCountEl.innerHTML = markCount;

   const originalTitle = title.replace("@", "'");
  
 console.log(originalTitle, views);
  const listDiv = document.createElement('div');
  listDiv.className = `flex justify-between gap-6 p-4 bg-white rounded-xl shadow-sm`;
  listDiv.innerHTML = `
  <p class="font-semibold text-[#12132D] w-2/3">${originalTitle}</p>
  <div class="flex gap-2 items-center">
    <img src="./images-&-icons/icon-eye.svg" alt="">
    <p>${views}</p>
  `;
  markedListsEl.appendChild(listDiv);
};

// to display latest posts
const displayLatestPosts = (posts)=> {

  posts.forEach((latestPost) => {
    const {cover_image, author, title, description, profile_image} = latestPost;
    const date = author.posted_date ? author.posted_date : "No publish date";
    const designation = author.designation ? author.designation : "Unknown";

    const latestPostCard = document.createElement('div');
    latestPostCard.className = `p-6 border border-gray-300 rounded-xl md:rounded-2xl max-w-[360px] shadow-sm hover:shadow-md hover:bg-[#797dfc1a] mx-auto`;
    latestPostCard.innerHTML=`
     <img src="${cover_image}" alt="cover photo" class="w-full h-48 rounded-xl md:rounded-2xl"/>
                    
    <div>
      <div class="flex gap-2 font-inter mt-6">
        <i class="fa-regular fa-calendar" class="w-6 h-6"></i>
        <span>${date}</span>
      </div>
      <h4 class="text-xl md:text-2xl text-[#12132D] font-bold md:font-extrabold  mt-4 mb-3">${title}</h4>
      <p class="font-inter text-base md:text-lg">${description}</p>
      <div class="flex gap-4 mt-4 items-center">
        <img src="${profile_image}" alt="${author.name}" class="w-10 h-10 rounded-full">
        <div>
          <h5 class="font-bold text-[#12132D]">${author.name}</h5>
          <p class="text-sm">${designation}</p>
        </div>
      </div>
    </div>
    `;
  latestPostContainer.appendChild(latestPostCard);

  });
};

// to hide the loader
const hideLoader = (loaderElement) => {
  loaderElement.classList.add('hidden');
}

handleLoad();
loadLatestPost();
