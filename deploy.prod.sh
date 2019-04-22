#deployment script


read -p "Build and send to server manager-client ? (Y|n) " client

if [ "$client" == "" -o "$client" == "y" -o "$client" == "Y" ]; then
	rm -R build
    rm -R build.zip
	npm run build
	tar zcvf build.zip build/
	#scp build.zip root@178.128.194.98:/var/www/client.com
    #ssh root@178.128.194.98
    scp -i "nomadLedgerMongod.pem" build.zip ubuntu@ec2-35-181-105-150.eu-west-3.compute.amazonaws.com:/var/www/client
    ssh -i "nomadLedgerMongod.pem" ubuntu@ec2-35-181-105-150.eu-west-3.compute.amazonaws.com
    cd /var/www/client
    bash ./build.sh
fi
