
// // script.js

// document.addEventListener('DOMContentLoaded', function() {
//     const stars = document.querySelectorAll('.stars span');
//     const averageRatingDisplay = document.getElementById('average-rating');
//     let currentRating = 8.5; // Initial average rating
//     let totalRatings = 100; // Number of ratings (for calculation)

//     stars.forEach(star => {
//         star.addEventListener('click', function() {
//             const userRating = parseInt(this.getAttribute('data-value'));

//             // Update total ratings and calculate new average
//             totalRatings += 1;
//             currentRating = ((currentRating * (totalRatings - 1)) + userRating) / totalRatings;

//             // Update the displayed average rating
//             averageRatingDisplay.textContent = currentRating.toFixed(1);

//             // Highlight selected stars
//             stars.forEach(s => s.classList.remove('selected'));
//             this.classList.add('selected');
//         });

//         star.addEventListener('mouseover', function() {
//             // Highlight stars up to the hovered one
//             const hoverValue = parseInt(this.getAttribute('data-value'));
//             stars.forEach(s => {
//                 if (parseInt(s.getAttribute('data-value')) <= hoverValue) {
//                     s.classList.add('selected');
//                 } else {
//                     s.classList.remove('selected');
//                 }
//             });
//         });

//         star.addEventListener('mouseout', function() {
//             // Reset stars to only show the user's selected rating
//             stars.forEach(s => s.classList.remove('selected'));
//         });
//     });
// });





// // JavaScript to filter activities based on selected filters
// document.addEventListener('DOMContentLoaded', function () {
//     const applyFiltersButton = document.getElementById('apply-filters');
//     const dateFilter = document.getElementById('date-filter');
//     const categoryFilter = document.getElementById('category-filter');
//     const moreFilters = document.getElementById('more-filters');
//     const activityCards = document.querySelectorAll('.activity-card');

//     applyFiltersButton.addEventListener('click', () => {
//         const selectedDate = dateFilter.value;
//         const selectedCategory = categoryFilter.value;
//         const selectedMoreFilter = moreFilters.value;

//         activityCards.forEach(card => {
//             const cardDate = card.getAttribute('data-date');
//             const cardCategory = card.getAttribute('data-category');
//             const cardMoreFilter = card.getAttribute('data-filter');

//             // Filter logic
//             const isDateMatch = selectedDate === "" || cardDate === selectedDate;
//             const isCategoryMatch = selectedCategory === "all" || cardCategory === selectedCategory;
//             const isMoreFilterMatch = selectedMoreFilter === "all" || cardMoreFilter === selectedMoreFilter;

//             if (isDateMatch && isCategoryMatch && isMoreFilterMatch) {
//                 card.style.display = 'block';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     });
// });





// let slider = document.getElementById('slider');
// let slideIndex = 0;
// const totalSlides = slider.children.length / 2;

// function moveNext() {
//     slideIndex++;
//     if (slideIndex >= totalSlides) {
//         slider.style.transition = 'none';
//         slideIndex = 0;
//         slider.style.transform = `translateX(0)`;
//         setTimeout(() => {
//             slider.style.transition = 'transform 0.5s ease-in-out';
//             slideIndex++;
//             slider.style.transform = `translateX(-${slideIndex * 25}%)`;
//         }, 0);
//     } else {
//         slider.style.transform = `translateX(-${slideIndex * 25}%)`;
//     }
// }

// function movePrev() {
//     if (slideIndex <= 0) {
//         slider.style.transition = 'none';
//         slideIndex = totalSlides - 1;
//         slider.style.transform = `translateX(-${slideIndex * 25}%)`;
//         setTimeout(() => {
//             slider.style.transition = 'transform 0.5s ease-in-out';
//             slideIndex--;
//             slider.style.transform = `translateX(-${slideIndex * 25}%)`;
//         }, 0);
//     } else {
//         slideIndex--;
//         slider.style.transform = `translateX(-${slideIndex * 25}%)`;
//     }
// }












// const thumbnail = document.getElementById('thumbnail');
// const videoWrapper = document.getElementById('videoWrapper');
// const video = document.getElementById('myVideo');

// // Add click event listener to the image (movie poster)
// thumbnail.addEventListener('click', function() {
//     // Show the video wrapper
//     videoWrapper.style.display = 'block';

//     // GSAP animation to pop up the video
//     gsap.to(videoWrapper, { 
//         duration: 0.8, 
//         scale: 1, 
//         ease: "power3.out",
//         onComplete: function() {
//             video.play();  // Play the video after the animation completes
//         }
//     });
// });

// // Optional: You could add a way to close the video or hide it after it's finished playing
// video.addEventListener('ended', function() {
//     gsap.to(videoWrapper, { 
//         duration: 0.5, 
//         scale: 0, 
//         ease: "power3.in", 
//         onComplete: function() {
//             videoWrapper.style.display = 'none';  // Hide the video after it shrinks down
//         }
//     });
// });

// document.getElementById("thumbnail").addEventListener("click", function() {
//     // Show the video when thumbnail is clicked
//     document.getElementById("videoWrapper").style.display = "block";
// });

// document.getElementById("closeBtn").addEventListener("click", function() {
//     // Hide the video and stop it when the close button is clicked
//     document.getElementById("videoWrapper").style.display = "none";
    
//     let video = document.getElementById("myVideo");
//     video.pause();  // Pause the video
//     video.currentTime = 0;  // Reset video to the beginning
// });



// Placeholder for dynamic interactivity (e.g., selecting showtimes, updating booking details)
document.querySelector('.book-now').addEventListener('click', () => {
    alert("Redirecting to booking page...");
});




const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
