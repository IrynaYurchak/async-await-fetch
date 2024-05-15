async function btnDetails(id) {
    const data = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=b588b1d4`)
        .then((response) => {
            return response.json();
        })
    document.querySelector('.modal-container').style.display = 'block'
    document.querySelector('.content-detail').style.display = 'flex'
    document.querySelector('.content').style.display = 'none'
    let element = document.getElementById("photo");
    element.style.backgroundSize = "cover";
    element.style.backgroundImage = `url('${data.Poster}')`;
    document.getElementById("name").textContent = data.Title;
    document.getElementById("rated").textContent = data.Rated;
    document.getElementById("text").textContent = data.Plot;
    document.getElementById("written").innerHTML = `<span>Written by:</span> ${data.Writer}`;
    document.getElementById("derected").innerHTML = `<span>Directed by:</span> ${data.Director}`;
    document.getElementById("starring").innerHTML = `<span>Starring:</span> ${data.Actors}`;
    document.getElementById("boxoffice").innerHTML = `<span>Box Office:</span> ${data.BoxOffice}`;
    document.getElementById("awards").innerHTML = `<span>Awards:</span> ${data.Awards}`;
    document.getElementById("ratings").innerHTML = `<span>Ratings:</span> ${data.Ratings.map(rating => rating.Source).join(', ')}`;
}

document.addEventListener('mousedown', function (event) {
    const contentDetail = document.querySelector('.content-detail');
    const content = document.querySelector('.content');
    const modalContainer = document.querySelector('.modal-container');
    if (!contentDetail.contains(event.target)) {
        contentDetail.style.display = 'none';
        content.style.display = 'flex';
        modalContainer.style.display = 'none';
    }
});

async function search() {
    var searchValue = document.getElementById("movieName").value;
    const data = await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=b588b1d4`)
        .then((response) => {
            return response.json();
        })
    const container = document.getElementById('movieList');
    container.innerHTML = '';
    data?.Search?.forEach(item => {
        container.insertAdjacentHTML('beforeend', `<div class="block-content">
        <div class="block-img" style="background-image: url('${item.Poster}'); background-size: cover;"></div>
        <div class="block-name">${item.Title}</div>
        <div class="block-movie">${item.Type}</div>
        <div class="block-year">${item.Year}</div>
        <input type="button" class="details" onclick="btnDetails('${item.imdbID
            }')" value="More details">
        </div>`);
    });
}


