function initProgram() {
    const axios = require("axios");
    const inquirer = require("inquirer");
    const fs = require("fs");

    let username;
    let userCompany;
    let userRealName;
    let profileImageURL;
    let userLocation;
    let userGitHubProfile;
    let userBlog;
    let userBio;
    let numberOfPublicRepos;
    let numberOfFollowers
    let numberOfGitHubStars;
    let numberOfUsersFollowing;
    let userFavColor;




    inquirer.prompt([{
        message: "Enter your GitHub username",
        name: "usernameProvided"
    },
    {
        message: "What is your favorite color?",
        name: "favoriteColor"
    }])
        .then(function ({ usernameProvided, favoriteColor }) {
            username = usernameProvided;
            userFavColor = favoriteColor;
            const queryUrl = `https://api.github.com/users/${username}`;
    goLook(queryUrl);
        });







    function goLook(URL) {

        axios.get(URL)
            .then(function (response) {
                console.log(response.data);
                // console.log(Object.keys(response.data));

                profileImageURL = response.data.avatar_url;
                userRealName = response.data.name;
                userLocation = response.data.location;
                userCompany = response.data.company;
                userGitHubProfile = response.data.html_url;
                userBlog = response.data.blog;
                userBio = response.data.bio;
                numberOfPublicRepos = response.data.public_repos;
                numberOfFollowers = response.data.followers;
                numberOfGitHubStars = response.data.starred_url.length;
                numberOfUsersFollowing = response.data.following;

                makeFile();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }




    function makeFile() {

        fs.writeFile(`../../${username}.html`, `
        
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="./assets/css/style.css">
            <link href="https://fonts.googleapis.com/css?family=Comfortaa|Sulphur+Point&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="./assets/css/simple-grid.min.css">
            <title>Document</title>
        </head>
        
        <body>
        
            <div class="top"></div>
            <div class="middle"></div>
            <div class="bottom"></div>
        
            <div class="top-card" style="background-color: ${userFavColor}"></div>
            <img src="${profileImageURL}" class="pic"></src>
            <h1 class="hi">Hi!</h1>
            <h1 class="my-name">My name is ${userRealName}</h1>
            <h2 class="currently-at">I'm currently @ ${userCompany}</h2>
            <h2 class="more-info">
                <span><a href="">${userLocation}</a></span>
                <span><a href="${userGitHubProfile}">Github</a></span>
                <span><a href="${userBlog}">Blog</a></span>
            </h2>
        
        
        
            <p class="bio">
            ${userBio}
            </p>
            <div class="cards card-left card-top" style="background-color: ${userFavColor}">
                <h2>
                    Public Repositories
                </h2>
                <h3>
                ${numberOfPublicRepos}
                </h3>
            </div>
            <div class="cards card-right card-top" style="background-color: ${userFavColor}">
                <h2>
                    Github Stars
                </h2>
                <h3>
                ${numberOfGitHubStars}
                </h3>
            </div>
            <div class="cards card-left card-bottom" style="background-color: ${userFavColor}">
                <h2>
                    Followers
                </h2>
                <h3>
                ${numberOfFollowers}
                </h3>
            </div>
            <div class="cards card-right card-bottom" style="background-color: ${userFavColor}">
                <h2>
                    Following
                </h2>
                <h3>
                ${numberOfUsersFollowing}
                </h3>
            </div>
        </body>
        
        </html>
        
        
        
        
        `, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("The file has been written.");

        });
    }

} initProgram();