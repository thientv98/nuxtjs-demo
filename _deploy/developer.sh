echo "Deploy script started"
cd /home/demo/www/internal/messenger/developer/admin
echo "Reset Git"
git reset --hard
echo "Start Git Pull"
git pull
echo "End Git Pull"
echo "Start yarn install"
yarn install
echo "End yarn install"
echo "Copy .env"
cp /home/demo/www/internal/messenger/developer/admin/_deploy/.developer.env /home/demo/www/internal/messenger/developer/admin/.env
# echo "Start yarn serve"
# yarn serve
# echo "End yarn serve"
echo "Start yarn lint"
yarn lint
echo "End yarn lint"
echo "Start yarn Build"
yarn build
yarn generate
echo "End yarn Build"
cp /home/demo/www/internal/messenger/developer/admin/_deploy/.htaccess /home/demo/www/internal/messenger/developer/admin/dist/.htaccess

echo -e '\e[1m\e[34m\nFinish deploy\e[0m\n'
