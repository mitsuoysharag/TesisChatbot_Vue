set -e

git init
# git add README.md
git add .
git commit -m 'deploy project'
# git remote rm origin
git remote add origin https://github.com/mitsuoysharag/TesisChatbot_Vue.git
# git pull origin master
git push -u origin master