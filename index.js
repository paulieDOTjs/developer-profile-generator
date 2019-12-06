function initProgram() {
    const axios = require("axios");
    const inquirer = require("inquirer");
    const fs = require("fs");

    let username;
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
    
    inquirer
    .prompt([{
            message: "Enter your GitHub username",
            name: "userNameProvided"
        },
        {
            message: "What is your favorite color?",
            name: "favoriteColor"
        }])
        .then(function ({ userNameProvided }) {
            username = userNameProvided
            const queryUrl = `https://api.github.com/users/${userNameProvided}`;
            goLook(queryUrl);
        });





    function goLook(URL) {

        axios.get(URL)
            .then(function (response) {
                // console.log('hi')
                // console.log(response.data);
                // console.log(Object.keys(response.data));

                profileImageURL = response.data.avatar_url;
                userRealName = response.data.name;
                // userLocation = response.data.
                // userGitHubProfile = response.data. idk what this means
                userBlog = response.data.blog;
                userBio = response.data.bio;
                numberOfPublicRepos = response.data.public_repos;
                numberOfFollowers = response.data.followers;
                numberOfGitHubStars = response.data.starred_url;
                numberOfUsersFollowing = response.data.following;

                console.log(profileImageURL + ' profile image')
                console.log(userRealName + ' username')
                // console.log(userLocation)
                console.log(userBlog + ' userblog')
                console.log(userBio + ' user bio')
                console.log(numberOfPublicRepos + ' number of repos')
                console.log(numberOfFollowers + ' number of followers')
                console.log(numberOfGitHubStars + ' number of stars')
                console.log(numberOfUsersFollowing + ' following')
              
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

        fs.writeFile(`${username}.html`, process.env.STR, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("The file has been written.");

        });
    }

} initProgram();