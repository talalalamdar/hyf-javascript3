let searchBox = document.getElementById("search-box");
let div = document.createElement("div");
document.body.appendChild(div);                                                  // Creating some nodes like divs, image, input field, adn the contents
div.id = "details-div";                                                          // of the file, and adding an event listener to the search button                                                     
let detailsDiv = document.getElementById("details-div");                        
let h2 = document.createElement("h2");
let h3 = document.createElement("h3");
let img = document.createElement("img");
img.className = "profile-pic";
let profilePic = document.getElementsByClassName("profile-pic");
let submitBut = document.getElementById("submit-button");
submitBut.addEventListener("click", checkTheName);

function checkTheName() {                                   // this function runs when pressing the search button, and it makes http requests
    detailsDiv.innerHTML = "";                  
    let userName = searchBox.value;
    detailsDiv.appendChild(h2);
    detailsDiv.appendChild(h3);

    makeRequest("https://api.github.com/users/" + userName + "/repos")
        .then((data) => {
            img.src = data[0].owner.avatar_url;
            h2.innerHTML = userName;
            detailsDiv.appendChild(img);
            let repoName = "";
            data.forEach(repo => {
                repoName = repo.name
                let li = document.createElement("li");
                li.innerHTML = repoName;
                h3.innerHTML = userName + "'s repositories:"
                let link = repo.html_url;
                let a = document.createElement("a");
                a.href = link;
                makeRequest("https://api.github.com/repos/" + userName + "/" + repoName + "/commits")
                    .then(commit => {
                        let lastCommit = commit[0]
                        let authorImg = document.createElement("img");
                        authorImg.src = lastCommit.author.avatar_url;
                        authorImg.className = 'author-img';
                        h3.appendChild(a);
                        let p = document.createElement("p");
                        let commitDate = lastCommit.commit.author.date;
                        let commitAuthor = lastCommit.commit.author.name;
                        p.innerHTML = "Last commit was at " + commitDate + " by " + commitAuthor;
                        li.appendChild(p);
                        li.appendChild(authorImg);
                        a.appendChild(li);
                    })
            })
        })
}

function makeRequest(url) {                         // this function to create an Http request and checks if it is successful   
    let request = new XMLHttpRequest();
    let requestIsDone = (success, failure) => {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status !== 200) {
                console.log("The request failed");
                failure(request.responseText);
            } else {
                console.log("Request is loaded");
                success(JSON.parse(request.responseText));
            }
        }
    }
    request.open("GET", url);
    //request.setRequestHeader("Authorization", "Basic " + btoa("talalalamdar:<token Api>"));
    return new Promise((resolve, reject) => {
        request.onreadystatechange = () => requestIsDone(resolve, reject);
        request.send();
    });
}