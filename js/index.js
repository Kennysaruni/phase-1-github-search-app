const gitForm = document.querySelector('#github-form')
const search = document.querySelector('input#search')
const gitUserList = document.querySelector('#user-list')
gitForm.addEventListener('submit',(e) => {
e.preventDefault()
const val = search.value
findUser(val)
})
function findUser(user){
  fetch(`https://api.github.com/search/users?q=${user}`, {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  })
    .then(res => res.json())
    .then(userArray)
}
function userArray(userObject){
  const arr = userObject.items
  console.log(arr)
  arr.forEach(renderUser);
}
function renderUser(user){
const card = document.createElement('div')
card.className = 'user-card'
card.addEventListener('click',() => {
  const username = card.querySelector(".username").textContent;
  getRepos(username,card)

 console.log(username)
})
gitUserList.appendChild(card)
const picDiv = document.createElement('div')
const userPic = document.createElement('img')
userPic.className = 'profile-pic' 
userPic.src =`${user.avatar_url}`
picDiv.appendChild(userPic)
card.appendChild(picDiv)
const description = document.createElement('div')
description.className = 'description'
const userName = document.createElement('p')
userName.textContent =`${user.login}`
userName.className = 'username'
description.append(userName)
const gitUrl = document.createElement('a')
gitUrl.className = 'user-url'
gitUrl.textContent = `${user.html_url}`
gitUrl.href = `${user.html_url}`
description.appendChild(gitUrl)
card.appendChild(description)
const repoList = document.createElement("ul");
  repoList.id = "repos-list";
  card.appendChild(repoList);
}
function getRepos(username,card){
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  })
  .then(res => res.json())
  .then((repositories) => {
    showRepo(repositories, card)}); 
  function showRepo(repositories, card) {
    repositories.forEach((repository) => {
      renderRepo(repository, card); 
    });
  }
}
function renderRepo(repository,card ){
  const repoList = card.querySelector("ul#repos-list");
  console.log(repoList)
  const repoLink = document.createElement("a");
  repoLink.className = "repo-url";
  repoLink.href = repository["html_url"];
  repoLink.textContent = repository["full_name"];
  repoList.appendChild(repoLink);
}

  





