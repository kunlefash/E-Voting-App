### A Decentralized E-Voting-App web application

# Blockchain Based E-voting Decentralized Application
This project is an attempt to create a robust, automated, secured E-voting System using Ethereum Blockchain technology.

# Why Ethereum?

Ethereum is a platform for Smart Contracts that provides the following:

* A public communication channel (i.e. its peer to peer network).
* All communication is authenticated (i.e. transactions are signed by the voter's Ethereum address)
* An immutable public ledger to store the voting information (i.e. eligibility white list, voting keys and votes).
* Economic majority must reach consensus on a program's execution.
# Types of accounts in Ethereum
<img src="https://github.com/AmrAhmedA/Seecured/blob/master/Diagrams/Diagrams%20for%20the%20system/Account%20Types/Account%20Types.png?raw=true" width="600" height="350"> 

## What is this project about?
This is a full stack web application(frontend + backend) 
The architecture is somewhat similar to the well known old 2 tier "client-server" model where "server" is replaced by "distributed p2p platform". From the point of view of an application programmer it is client-server where the server is a local or remote Ethereum node exposing RPC interface.
## Election Stages
<img src="https://github.com/AmrAhmedA/Seecured/blob/master/Diagrams/Diagrams%20for%20the%20system/Election%20Stages/ElectionStages.png" width="650" height="200">

## Election Process
<img src="https://github.com/AmrAhmedA/Seecured/blob/master/Diagrams/Diagrams%20for%20the%20system/Process%20Scenario%20Diagram/ProcessExamplePDF.png" width="800" height="350">


# Prerequisite

## Programming and Scripting Languages used
* Solidity 
* React  
* JavaScript
* Html & Css (Styling and Markup)

## Code Editor
* [Vscode](https://code.visualstudio.com/)

## NPM dependencies used 
* [React](https://www.npmjs.com/package/react) -  development for web sync
* [gh-pages](https://www.npmjs.com/package/gh-pages) - Github hosting service


## Web Application Prerequisites
* [Truffle](https://www.trufflesuite.com/truffle) - Development framework 
* [NodeJs](https://nodejs.org/en/) - Run time environment
* [MetaMask](https://metamask.io/) - Self-hosted wallet
* [Bootstrap](https://getbootstrap.com/) - Potent front-end framework for UI
* [Solidity](https://solidity.readthedocs.io/en/v0.6.3/) - High-level language for implementing smart contract
* [Remix Ethereum](https://remix.ethereum.org/) - Smart contract IDE and debugger


## Running Local Blockchain
* [Ganache](https://www.trufflesuite.com/docs/ganache/overview) - Personal local Blockchain for Ethereum development


## Installation Guidelines
To begin working on the project for development purposes, open your command (Windows) or terminal (Linux) and clone the project through the following command 
```
git clone https://github.com/kunlefash/E-Voting-App.git
```
### Install Dependencies
| Dependencies | Site |
| ------ | ------ |
| Node Package Manager (NPM) | https://nodejs.org/en/download/ |
| Ganache | https://www.trufflesuite.com/ganache |
| MetaMask | https://metamask.io/download.html |
| Vscode (Code Editor) | https://code.visualstudio.com/ | 


1. After installing the node package manager, make sure you have added it to the environment variables if you are using windows OS
2. Make sure to check your node package manager version by typing the following command ```npm -v ```
3. Refer to the cloned project folder using your terminal and run ``` npm install ```
4. Run ```npm run dev``` to run the web app on lite server


## Future work 
- [ ] Enhancing the application client-side by using SPA framework (React or angular)
- [ ] Integration with paper-based voting
- [ ] Enhancing registration phase
- [ ] Adding Extra functionalities for impaired individuals to participate in the voting process


## Supervised by 
* Professor E.A Ogunti