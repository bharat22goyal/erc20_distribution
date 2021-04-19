# Introduction

This is a node.js application to perform ERC-20 token distribution. 

## Setup Steps

Clone the directory 

```
git clone https://github.com/bharat22goyal/erc20_distribution
cd erc20_distribution
```

Build and run docker container
```
docker build . -t bharat/node-blockchain
docker run -it bharat/node-blockchain sh
```

Enter the following command to perform distribution
```
node index.js
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
