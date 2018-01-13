let searchBox = document.getElementById("search-box");
let div = document.createElement("div");
document.body.appendChild(div);                                                  // Creating some nodes like divs, image,
div.id = "details-div";                                                          //  input field, adn the contents                                                     
let detailsDiv = document.getElementById("details-div");                         // of the file, and adding an event listener to 
let h2 = document.createElement("h2");                                           // the search button 
let h3 = document.createElement("h3");
let img = document.createElement("img");
img.className = "profile-pic";
let profilePic = document.getElementsByClassName("profile-pic");
let submitBut = document.getElementById("submit-button");
submitBut.addEventListener("click", checkTheName);

function checkTheName() {                                   // this function runs when pressing 
    detailsDiv.innerHTML = "";                              // the search button, and it makes http requests
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

function makeRequest(url) {
    return new Promise((resolve, reject) => {                       // this function to create an Http request    
        let request = new XMLHttpRequest();                         // and checks if it is successful
        request.onreadystatechange = () => {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status !== 200) {
                    console.log("The request failed");
                    reject(request.responseText);
                } else {
                    console.log("Request is loaded");
                    resolve(JSON.parse(request.responseText));
                }
            }
        }
        request.open("GET", url);
        //request.setRequestHeader("Authorization", "Basic " + btoa("talalalamdar:<token Api>"));
        request.send();

    })
}