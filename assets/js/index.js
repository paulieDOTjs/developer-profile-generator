function initProgram() {
    const axios = require("axios");
    const inquirer = require("inquirer");
    const fs = require('fs'),
        convertFactory = require('electron-html-to');

    const conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
    });

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
                console.log(Object.keys(response));

                profileImageURL = response.data.avatar_url;
                userRealName = response.data.name;
                userLocation = response.data.location;
                userCompany = response.data.company;
                userGitHubProfile = response.data.html_url;
                userBlog = response.data.blog;
                userBio = response.data.bio;
                numberOfPublicRepos = response.data.public_repos;
                numberOfFollowers = response.data.followers;
                // numberOfGitHubStars = response.data.starred_url.length;
                numberOfUsersFollowing = response.data.following; star

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
        const resume = `
        
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <style>
            /* cyrillic-ext */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v27/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMDr4fJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
            }
    
            /* cyrillic */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v27/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMDrcfJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
    
            /* greek */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v27/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMDrAfJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0370-03FF;
            }
    
            /* vietnamese */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v27/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMDrwfJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
            }
    
            /* latin-ext */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v27/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMDr0fJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
    
            /* latin */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v27/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMDrMfJh1Zyc61YA.woff) format('woff');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
    
            /* latin-ext */
            @font-face {
                font-family: 'Sulphur Point';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Sulphur Point Regular'), local('SulphurPoint-Regular'), url(https://fonts.gstatic.com/s/sulphurpoint/v1/RLp5K5vv8KaycDcazWFPBj2adfAYuoMtXHvxDA.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
    
            /* latin */
            @font-face {
                font-family: 'Sulphur Point';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Sulphur Point Regular'), local('SulphurPoint-Regular'), url(https://fonts.gstatic.com/s/sulphurpoint/v1/RLp5K5vv8KaycDcazWFPBj2adf4YuoMtXHs.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
    
            body {
                margin: 0;
                margin-left: .15in;
                margin-right: .15in;
                margin-top: .18in;
                margin-bottom: .22in;
            }
    
            .top,
            .middle,
            .bottom {
                height: 3.53in;
                width: 8.2in;
                position: absolute;
                margin: 0;
                border-radius: 10px;
            }
    
            .top,
            .bottom {
                background-color: #373737;
            }
    
            .middle {
                margin-top: 3.53in;
            }
    
            .bottom {
                margin-top: 7.06in;
            }
    
            .top-card {
                height: 3.25in;
                margin-top: 0.5in;
                width: 7.84in;
                margin-left: 0.18in;
                position: absolute;
                border-radius: 10px;
            }
    
            .pic {
                margin-top: 0.25in;
                height: 1.64in;
                width: 1.64in;
                margin-left: 3.3in;
                position: absolute;
                border-radius: 50%;
                border: white 2px solid;
            }
    
            .hi {
                position: absolute;
                margin-top: 2in;
                width: 8.2in;
                text-align: center;
            }
    
            .my-name {
                position: absolute;
                margin-top: 2.4in;
                width: 8.2in;
                text-align: center;
            }
    
            .currently-at {
                position: absolute;
                margin-top: 2.8125in;
                width: 8.2in;
                text-align: center;
            }
    
            .more-info {
                position: absolute;
                margin-top: 3.125in;
                width: 8.2in;
                text-align: center;
            }
    
            .bio {
                position: absolute;
                margin-top: 4in;
                width: 7.84in;
                margin-left: 0.18in;
                text-align: center;
            }
    
            .cards {
                position: absolute;
                width: 2.95in;
                height: 0.78in;
                border: #373737 2px solid;
                border-radius: 10px;
                text-align: center;
            }
    
            .card-left {
                margin-left: 0.9in;
            }
    
            .card-right {
                margin-left: 4.25in;
            }
    
            .card-top {
                margin-top: 4.72in;
            }
    
            .card-bottom {
                margin-top: 5.85in;
            }
    
            a,
            h1,
            h2,
            h3 {
                text-decoration: none;
                color: white;
                font-family: 'Comfortaa', cursive;
                margin: 0.075in;
            }
    
            p {
                font-family: 'Sulphur Point', sans-serif;
                font-size: 20px;
            }
    
            span {
                margin: 0.05in;
            }
        </style>
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
        `

        conversion({ html: resume }, function (err, result) {
            if (err) {
                return console.error(err);
            }

            console.log(result.numberOfPages);
            console.log(result.logs);
            result.stream.pipe(fs.createWriteStream(`../../${username}.html`));
            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        });

    }
} initProgram()