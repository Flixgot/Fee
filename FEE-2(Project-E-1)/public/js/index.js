const city = document.getElementById('city');
const crossBtn = document.getElementById('cross');
const cityPage = document.getElementById('cityPage');
const cityAbout =  document.querySelectorAll(".cityAbout"); 
const citySearchBox = document.getElementById('citySearch');
const nextBtn = document.getElementById('nextBtn');
const video = document.getElementById('video');
const movieName = document.getElementById('movie-name');
const movieDesc = document.getElementById('movie-desc');
const container = document.getElementById('container');
const theaterInfo = document.querySelectorAll(".theater-info");
const th = document.getElementById('th');

const movies = [
    { index: 1, summary: `Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.`, title:"Deadpool And Wolverine" },
    { index: 2, summary: "A soldier returns home from war to find his girlfriend missing, family broken, and neighborhood overrun by crime. Though reluctant, he becomes a hitman to protect loved ones.", title:"Gadar2" },
    { index: 3,  summary:"A prison warden recruits inmates to commit outrageous crimes that shed light on corruption and injustice - and that lead him to an unexpected reunion.", title:"Jawan"},
    { index: 4, title: "Avatar The way of water", summary: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."},
    { index: 5, title:"Stree2", summary: "After the events of Stree, the town of Chanderi is being haunted again. This time, women are mysteriously abducted by a terrifying headless entity. Once again, it's up to Vicky and his friends to save their town and loved ones."}
];

let index = 1;

crossBtn.addEventListener("click", () => {
    city.style.display = "none";
});

cityPage.addEventListener("click", () => {
    city.style.display = "block";
});

cityAbout.forEach(about => {
    about.addEventListener("click", () => {
        cityPage.innerHTML = about.children[1].innerHTML;
        // city.style.display = "none";
    });
});


citySearchBox.addEventListener("input", () => {
    const searchVal = citySearchBox.value.toLowerCase();
    cityAbout.forEach(about => {
        cityVal = about.children[1].innerHTML.toLowerCase();
        if (cityVal.includes(searchVal)) {
            about.style.display = "block";
        } else {
            about.style.display = "none";
        }
});
});

nextBtn.addEventListener("click", () => {
    const movieAbout = document.getElementById("movie-about");
    
    video.classList.add("slide-out");
    movieAbout.classList.add("slide-out");
    container.classList.add("slide-out");

    setTimeout(() => {
        if (index == 4) {
            index = 0;
        } else {
            index++;
        }
        
        video.src = `../Files/vedio/${movies[index].index}.mp4`;
        movieName.innerHTML = movies[index].title;
        movieDesc.innerHTML = movies[index].summary;

        console.log(`../Files/vedio/${movies[index].index}.mp4`);

        video.classList.remove("slide-out");
        movieAbout.classList.remove("slide-out");
        container.classList.remove("slide-out");

        video.classList.add("slide-in");
        movieAbout.classList.add("slide-in");
        container.classList.add("slide-in");
        setTimeout(() => {
            video.classList.remove("slide-in");
            movieAbout.classList.remove("slide-in");
            container.classList.remove("slide-in");
        }, 200);
    }, 200);
});

container.addEventListener("mouseover", () => {
    nextBtn.style.display = "block";
});

container.addEventListener("mouseout", () => {
    nextBtn.style.display = "none";
    console.log("hello");

});

video.addEventListener("timeupdate", () => {
    if (video.currentTime == video.duration) {
        video.play();
    }
});

const cityAboutElements = document.querySelectorAll('.cityAbout');


cityAboutElements.forEach(city => {
    city.addEventListener('click', () => {
        const theaterInfo = city.querySelector('.theater-info');
        theaterInfo.style.display = theaterInfo.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!city.contains(event.target)) {
            const theaterInfo = city.querySelector('.theater-info');
            theaterInfo.style.display = 'none';
        }
    });
});

theaterInfo.forEach(theater => { 
        Array.from(theater.getElementsByTagName('p')).forEach(p => {
            p.addEventListener('click', (e) => {
                // console.log(e.target.innerHTML);
                // theater.innerHTML = e.target.innerHTML;
                let val = e.target.innerHTML;
                // console.log(val);
                th.innerHTML = val;
        });
    });
});