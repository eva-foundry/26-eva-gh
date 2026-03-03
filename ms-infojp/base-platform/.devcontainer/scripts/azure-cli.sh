# Copyright (c) Microsoft Corporation.
# Licensed under the MIT license.

#!/bin/bash 
set +e  # Don't exit on errors - use fallback methods

CMD=az
NAME="Azure CLI"

echo -e "\e[34m»»» 📦 \e[32mInstalling \e[33m$NAME\e[0m ..."

# Method 1: Try apt installation (may fail on GPG signature)
sudo apt-get update 2>/dev/null
sudo apt-get install -y ca-certificates curl apt-transport-https lsb-release gnupg 2>/dev/null

curl -sL https://packages.microsoft.com/keys/microsoft.asc 2>/dev/null |
    gpg --dearmor 2>/dev/null |
    sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null 2>&1

AZ_REPO=$(lsb_release -cs)
echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" |
    sudo tee /etc/apt/sources.list.d/azure-cli.list > /dev/null

sudo apt-get update 2>/dev/null
sudo apt-get install -y azure-cli 2>/dev/null

# Method 2: Fallback to pip if apt failed
if ! command -v az &> /dev/null; then
    echo -e "\e[33m»»» Using pip fallback method...\e[0m"
    pip install --user azure-cli
    export PATH="$HOME/.local/bin:$PATH"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi

# Install cli extension(s)
echo -e "\n\e[34m»»» 🔐 \e[32mAdding webapp authV2 extension"
az extension add --name authV2 --system

echo -e "\n\e[34m»»» 💾 \e[32mInstalled to: \e[33m$(which $CMD)"
echo -e "\e[34m»»» 💡 \e[32mVersion details: \e[39m$($CMD --version)"