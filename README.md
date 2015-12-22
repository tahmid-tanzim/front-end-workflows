# Workflow Management
Front-End Web Project Workflows with Node.js, Gulp.js,and Browserify

## 1. Setup development environment in Ubuntu 14.04
### 1.1. Installing [Node.js](https://nodejs.org/en/) via [nvm (Node Version Manager)](https://github.com/creationix/nvm) on Ubuntu Linux.
##### Installing [NVM](https://github.com/creationix/nvm)
```
sudo apt-get install git git-core curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```
or Wget:
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```
##### Append the NVM path in ~/.bashrc
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```
##### Load ~/.bashrc and Check if NVM successfully installed.
```
source ~/.bashrc
nvm
```
##### Installing [Node.js](https://nodejs.org/en/) and Set default version
```
nvm install 0.12.7
nvm alias default 0.12.7
node --version
nvm list
```
### 1.2. Installing Ruby 2.x with rbenv
```
sudo apt-get update
sudo apt-get -y install curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev
```
```
cd
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL
```
```
git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```
```
git clone https://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash
rbenv install 2.2.3
rbenv global 2.2.3
ruby -v
```
### 1.3. Installing [Gulp.js](http://gulpjs.com/) for creating workflows
```
npm install -g gulp
npm install --save-dev gulp
npm install --save-dev gulp-util
npm install --save-dev gulp-coffee
npm install --save-dev gulp-concat
```
### 1.4. Installing [Browserify](http://browserify.org/) for requiring modules in browser
```
npm install -g browserify
```
### 1.5. Installing [Sass](http://sass-lang.com/) and [Compass](http://compass-style.org/)
```
ruby -v
gem update
gem install sass
gem install compass
```
## 2. Software Version
Link to [Semantic Versioning](http://semver.org/)
