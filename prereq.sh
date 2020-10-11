
#!/bin/sh

# Connect to ec2 instance.
# Following script is for Ubuntu 16.0.4

echo "----------------------------------- ----------------------------------- -----------------------------------"
echo "Installing Pre-Requisites..."

echo "-(1) Installing MongoDB"
# Import the public key used by the package management system.
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
# Create a list file for MongoDB.
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
# Reload local package database
sudo apt-get update
# Install the MongoDB packages
sudo apt-get install -y mongodb-org
# echo "Starting MongoDB"
 sudo service mongod start
 sudo service mongod status

echo "-(2) Installing node (v10)"
# Adding the NodeSource APT repository for Debian-based distributions repository AND the PGP key for verifying packages
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
# Install Node.js from the Debian-based distributions repository
sudo apt-get install -y nodejs

echo "-(3) Installing pm2"
sudo npm install -g pm2

echo "-(4) Installing Chrome Headless dependencies"
sudo apt-get update
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

echo "-(5) Installing yarm"
sudo npm install -g yarn

echo "Installing Pre-Requisites Complete"
echo ""


echo "----------------------------------- ----------------------------------- -----------------------------------"
echo "Checking Installation Status"

echo "^(1) MongoDB"
mongo --version
echo "^(2) node"
node -v
echo "^(3) pm2"
pm2 -v
echo "^(5) yarn"
yarn -v