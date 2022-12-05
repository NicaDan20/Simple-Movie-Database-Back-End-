let nrOfChar = 300;
let contents = document.querySelectorAll(".card-text");
contents.forEach(content => {
    if (content.textContent.length < nrOfChar) {
        content.nextElementSibling.style.display = "none";
    } else {
        let displayText = content.innerHTML.slice(0, nrOfChar)
        let moreText = content.innerHTML.slice(nrOfChar)
        content.innerHTML = `${displayText}<span class="dots">...</span><span class="hide more">${moreText}</span>`;
    }
})

function readMore(btn) {
    let post = btn.parentElement;
    console.log(post)
    post.querySelector(".dots").classList.toggle("hide");
    post.querySelector(".more").classList.toggle("hide");
    btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More"
}