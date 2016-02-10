# Gist Manager

I code this little spa app for managing your gist locally. At the moment you can just GET a list of all your gists
saved in github using the github api. You have the ability to filter them by public, private or just all of them.
I integrate a ACE editor with the idea to create or edit you gist from your local environment.

## Technologies used:
- The awesome AngularJS
- Bower for managing you libraries
- ACE UI editor for angular apps
- ngAnimate to make it sexy
- Bootstrap for base styles
- jQuery for some minimal DOM manipulation

## Get started:
- clone the repo
```
git clone https://github.com/inaki/gists-manager
```
- get your github api ***token***
```
$ curl https://api.github.com/authorizations --user '{your user name here}' --data '{"scopes":["gist"], "note":"gist manager"}'
```
- copen your token from terminal and go to line 26 to paste your token or use and environment variable
```
  url: 'https://api.github.com/users/{your user name here}/gists?access_token= '+ token +'';
```
- run your server, the one I like is http-server from npm (npm install http-server -g)
```
$ http-server
```
- go to your browser http://localhost:8080 and enjoy watching =)

## Some considerations
If you git push your the project with your token github automatically will invalidate it. So to avoid this just use an environment variable and you'll be free to go.
