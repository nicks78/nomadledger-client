#deployment script


read -p "Build and send to server manager-client ? (Y|n) " client

if [ "$client" == "" -o "$client" == "y" -o "$client" == "Y" ]; then
		rm -R build
    rm -R build.zip
		npm run build
		tar zcvf build.zip build/
    scp -i "nomadLedgerMongod.pem" build.zip ubuntu@ec2-35-180-114-245.eu-west-3.compute.amazonaws.com:/var/www/client
    ssh -i "nomadLedgerMongod.pem" ubuntu@ec2-35-180-114-245.eu-west-3.compute.amazonaws.com
    cd /var/www/client
    bash ./build.sh
fi
