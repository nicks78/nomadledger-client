#deployment script

read -p "Commit message ? " message

git add .
git commit -m "$message"


read -p "Build version patch ? (Y|n) " patch

if [ "$patch" == "" -o "$patch" == "y" -o "$patch" == "Y" ]; then
		npm version patch
		git push origin master --tags
fi

read -p "Build version minor ? (Y|n) " minor

if [ "$minor" == "" -o "$minor" == "y" -o "$minor" == "Y" ]; then
		npm version minor
		git push origin master --tags
fi

read -p "Build version major ? (Y|n) " major

if [ "$major" == "" -o "$major" == "y" -o "$major" == "Y" ]; then
		npm version major
		git push origin master --tags
fi




read -p "Build and send to server manager-client ? (Y|n) " client

if [ "$client" == "" -o "$client" == "y" -o "$client" == "Y" ]; then
	rm -R build
    rm -R build.zip
	npm run prebuild
	npm run build
	tar zcvf build.zip build/
    scp -i "nomadLedgerMongod.pem" build.zip ubuntu@ec2-35-181-105-150.eu-west-3.compute.amazonaws.com:/var/www/client
    ssh -i "nomadLedgerMongod.pem" ubuntu@ec2-35-181-105-150.eu-west-3.compute.amazonaws.com
    cd /var/www/client
    bash ./build.sh
fi
