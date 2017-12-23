
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
    detailsDiv.appendChild(img);
    requests();

    function requests() {
        let firstRquest = new XMLHttpRequest();
        firstRquest.onreadystatechange = () => {
            if (firstRquest.readyState === XMLHttpRequest.DONE) {
                if (firstRquest.status !== 200) {
                    console.log("not 200");
                    h2.innerHTML = "This username doesn't exist"
                } 
                else {
                    console.log("loaded first request")
                    let data = JSON.parse(firstRquest.responseText);
                    let imageSrc = data.avatar_url;
                    img.src = imageSrc;
                    h2.innerHTML = userName;

                    let secondRequest = new XMLHttpRequest();
                    secondRequest.onreadystatechange = () => {
                        if (secondRequest.readyState === XMLHttpRequest.DONE) {
                            if (secondRequest.status !== 200) {
                                console.log("not 200");
                                h3.innerHTML = "Something went wrong"
                            } else {
                                console.log("loaded second request")
                                let repoName = "";
                                let data2 = JSON.parse(secondRequest.responseText)
                                data2.map(repo => {
                                    console.log(data2)
                                    console.log("the map is working")
                                    let li = document.createElement("li");
                                    repoName = repo.name;
                                    li.innerHTML = repoName;
                                    h3.innerHTML = userName + "'s repositories:"
                                    h3.appendChild(li);

                                    let thirdRequest = new XMLHttpRequest();
                                    thirdRequest.onreadystatechange = () => {
                                        if (thirdRequest.readyState === XMLHttpRequest.DONE) {
                                            if (thirdRequest.status !== 200) {
                                                console.log("not 200")
                                                h3.innerHTML = "Something went wrong"
                                            } else {
                                                console.log("loaded third request");
                                                let data3 = JSON.parse(thirdRequest.responseText)
                                                let lastCommit = data3[0]
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
        firstRquest.open("GET", "https://api.github.com/users/" + userName);
        firstRquest.send();
    }
}


let submitBut = document.getElementById("submit-button");
submitBut.addEventListener("click", checkTheName);
