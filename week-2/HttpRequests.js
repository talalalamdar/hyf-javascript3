
let searchBox = document.getElementById("search-box");
let div = document.createElement("div");
document.body.appendChild(div);
div.id = "details-div";
let detailsDiv = document.getElementById("details-div");



function checkTheName() {

    detailsDiv.innerHTML = "";
    let userName = searchBox.value;
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    detailsDiv.appendChild(h2)
    detailsDiv.appendChild(h3);
    let img = document.createElement("img");
    img.className = "profile-pic"
    
    requests();

    function requests() {
        let firstRequest = new XMLHttpRequest();
        firstRequest.onreadystatechange = () => {
            if (firstRequest.readyState === XMLHttpRequest.DONE) {
                if (firstRequest.status !== 200) {
                    console.log("not 200");
                    h2.innerHTML = "This username doesn't exist"
                } 
                else {
                    console.log("loaded first request")
                    let data = JSON.parse(firstRequest.responseText);
                    let imageSrc = data.avatar_url;
                    img.src = imageSrc;
                    h2.innerHTML = userName;
                    detailsDiv.appendChild(img);

                    let secondRequest = new XMLHttpRequest();
                    secondRequest.onreadystatechange = () => {
                        if (secondRequest.readyState === XMLHttpRequest.DONE) {
                            if (secondRequest.status !== 200) {
                                console.log("not 200");
                                h3.innerHTML = "Something went wrong, couldn't reach the repositories"
                            } else {
                                console.log("loaded second request")
                                let repoName = "";
                                let data2 = JSON.parse(secondRequest.responseText)
                                data2.forEach(repo => {
                                   
                                    repoName = repo.name;
                                    let li = document.createElement("li");
                                    h3.innerHTML = userName + "'s repositories:"
                                    li.innerHTML = repoName;
                                    

                                    let thirdRequest = new XMLHttpRequest();
                                    thirdRequest.onreadystatechange = () => {
                                        if (thirdRequest.readyState === XMLHttpRequest.DONE) {
                                            if (thirdRequest.status !== 200) {
                                                console.log("not 200")
                                                h3.innerHTML = "Something went wrong, couldn't reach the commits"
                                            } else {
                                                console.log("loaded third request");
                                                let data3 = JSON.parse(thirdRequest.responseText)
                                                let lastCommit = data3[0]  
                                                h3.appendChild(li);
                                                let p = document.createElement("p");
                                                let commitDate = lastCommit.commit.author.date;
                                                let commitAuthor = lastCommit.commit.author.name
                                                p.innerHTML = "last commit was at " + commitDate + " by " + commitAuthor
                                                li.appendChild(p)
                                            }
                                        }
                                    }
                                    let url2 = "https://api.github.com/repos/" + userName + "/" + repoName + "/commits";
                                    thirdRequest.open("GET", url2);
                                    thirdRequest.send()
                                });
                            }
                        }
                    }
                    let url = "https://api.github.com/users/" + userName + "/repos"
                    secondRequest.open("GET", url)
                    secondRequest.send();
                }
            }
        };
        firstRequest.open("GET", "https://api.github.com/users/" + userName);
        firstRequest.send();
    }
}


let submitBut = document.getElementById("submit-button");
submitBut.addEventListener("click", checkTheName);
