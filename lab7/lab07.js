const works = [
    { author: "Micheal Jackson",lifetime:"1022-1055",tips: "Human", photos: ["human1.jpg","human2.jpg","human3.jpg"] },
    { author: "Maria JK",lifetime:"1920-2001", tips: "Classical", photos: ["classical1.jpg","classical2.jpg"] },
    { author: "John Herry UY", lifetime:"1894-1928",tips: "Abstract", photos: ["abstract1.jpg","abstract2.jpg","abstract3.jpg","abstract4.jpg","abstract5.jpg"] },
    { author: "Coco",lifetime:"1777-1799", tips: "Beauty",  photos: ["beauty1.jpg","beauty2.jpg"] }
];
let itemDiv = document.createElement("div"),
    innerDiv = document.createElement("div"),
    photoDiv = document.createElement("div"),
    button = document.createElement("button"),
    genre = document.createElement("h4"),
    artist = document.createElement("h3"),
    life = document.createElement("p"),
    photoTopic = document.createElement("h3");
    all = document.createElement("div");

itemDiv.className = "item";
innerDiv.className = "inner-box";
photoDiv.className = "inner-box";
genre.className = "outLayer";

photoTopic.innerHTML = "Popular Photos";
button.innerHTML = "Visit";
artist.style.display = "inline";
life.style.fontWeight = "bold";
life.style.display = "inline";
life.style.marginLeft = "1%";

itemDiv.appendChild(genre);
innerDiv.appendChild(artist);
innerDiv.appendChild(life);
photoDiv.appendChild(photoTopic);
itemDiv.appendChild(innerDiv);
itemDiv.appendChild(photoDiv);
itemDiv.appendChild(button);

let arr = [itemDiv.cloneNode(true),itemDiv.cloneNode(true),itemDiv.cloneNode(true),itemDiv.cloneNode(true)];

for(let i = 0;i<4;i++){
    arr[i].children.item(0).innerHTML = "Genre:"+ works[i].tips;
    arr[i].children.item(1).children.item(0).innerHTML = works[i].author;
    arr[i].children.item(1).children.item(1).innerHTML = "lifetime:"+works[i].lifetime;
    for(let j = 0;j<works[i].photos.length;j++){
        let picture = document.createElement("img");
        picture.src = "pics/"+works[i].photos[j];
        picture.className= "photo";
        arr[i].children.item(2).appendChild(picture);
    }
    all.appendChild(arr[i]);
}
document.querySelector('.flex-container').appendChild(all);
