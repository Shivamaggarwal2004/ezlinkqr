const accordin_item = document.querySelectorAll(".accordin-item")
accordin_item.forEach(item => {
    const title = document.querySelector(".title")
    const content = document.querySelector(".content")


    item.addEventListener("click", () => {
        for (var i = 0; i < accordin_item.length; i++) {
            if (accordin_item[i] != item) {
                accordin_item[i].classList.remove("active")
            } else {
                item.classList.toggle("active")



            }

         
        }
    })
})