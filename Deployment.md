# Configuring the Program

Create a .env file within the root of the BRLFrontend directory and include:

`VITE_BRL_BACKEND_URL=https://[Backend URL]/BLR/api`

## Compiling the Frontend
Ensure you are in the root directory for the BuzzwordFrontends project

Grant execution priviledge for the start.sh bash script:

`chmod +x start.sh`

Compile the frontends:

`./start.sh`

## Manually compile BRL Frontend

Change to the BRLFrontend directory:

`cd BRLFrontend`

Install npm packages:

`npm install`

Compile the BRL frontend:

`npm run dev`

Click the URL provided in the terminal to load the BRL website.

## Manually compile FlowerSSO

In a new terminal, change to the FlowerSSOFrontend directory

`cd FlowerSSOFrontend`

Install npm packages

`npm install`

Compile the FlowerSSO

`npm run dev`

## Frontend Dependencies
| Dependencies | Version |
|-----------| --------- |
| Axios |  1.13.2 | 
| Vue Feather | 2.0.0 |
| Feather Icons | 4.29.2 |
| Vue | 3.5.25 |
| Vue Router | 4.6.3 | 
| Vite | 7.2.4 |
| Node | 20.19.0 |
| Node Package Manager (NPM) | 11.6.2 |
| Node Version Manager (NVM) | 0.40.3 |
