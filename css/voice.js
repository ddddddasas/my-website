document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.getElementById("filter-button");
    const ageFilter = document.getElementById("age-filter");
    const jobFilter = document.getElementById("job-filter");
    const reviews = Array.from(document.querySelectorAll(".review"));

    function filterReviews() {
        const selectedAge = ageFilter.value;
        const selectedJob = jobFilter.value;

        reviews.forEach((review) => {
            const details = review.querySelector(".details").textContent;
            const ageMatch = details.match(/(\d+)歳/);
            const age = ageMatch ? parseInt(ageMatch[1], 10) : null;

            const matchesAge =
                selectedAge === "all" ||
                (selectedAge === "10代" && age >= 10 && age < 20) ||
                (selectedAge === "30代" && age >= 30 && age < 40) ||
                (selectedAge === "40代" && age >= 40 && age < 50) ||
                (selectedAge === "50代" && age >= 50 && age < 60);

            const matchesJob = selectedJob === "all" || details.includes(selectedJob);

            const matches = matchesAge && matchesJob;
            review.style.display = matches ? "block" : "none";
        });
    }

    filterButton.addEventListener("click", filterReviews);

    document.getElementById("filter-form").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            filterReviews();
        }
    });

    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal .modal-content");
    const modalOverlay = document.querySelector(".modal-overlay");
    const closeModal = document.querySelector(".modal .close");

    reviews.forEach((review) => {
        review.addEventListener("click", function () {
            const details = this.querySelector(".details").textContent;
            const mainText = this.querySelector("strong").textContent;
            const subText = this.querySelector("strong.small").textContent;
            const imgSrc = this.querySelector("img").src;
    
            modalContent.innerHTML = `
            <div class="modal-left">
                <img src="${imgSrc}" alt="詳細画像">
            </div>
            <div class="modal-right">
                <p><strong>${details}</strong></p>
                <p>${mainText}</p>
                <p><small>${subText}</small></p>
            </div>
        `;
            modal.classList.add("show");
            modalOverlay.classList.add("show");
        });
    });
    
    closeModal.addEventListener("click", function () {
        modal.classList.remove("show");
        modalOverlay.classList.remove("show");
    });

    modalOverlay.addEventListener("click", function () {
        modal.classList.remove("show");
        modalOverlay.classList.remove("show");
    });
});
