## StockX Take Home Test
Your goal is to create a service that will accept new true-to-size data through the Hypertext Transfer Protocol (HTTP) and 
store this data in a relational database, preferably Postgres. Additionally, this service should be able to
return a shoe’s TrueToSizeCalculation , defined below, through an HTTP request. True to size entries
range between 1 and 5, inclusive, where 1: really small, 2: small, 3: true to size, 4: big and 5: really big.

## Tech/framework used
- Node.js
- Express
- Postgres
- Docker

## How to use?
1) Clone the project to your local machine.
2) `cd stockx_test/app`
3) Run `npm install`
4) `cd ..` to go back to `stockx_test`
5) Run `docker-compose up` and wait for all the containers to start up
6) You can use postman or curl to make a request to the endpoint
7) CURL example: `curl -X POST \
  http://localhost:3000/api/v1/shoe_reading \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: bde1c580-050e-4921-97fd-5ac3248ce9ff' \
  -H 'cache-control: no-cache' \
  -d '{
	"shoe_name": "New shoe1",
	"shoe_size": "5"
}'`

## Contact
shiva.ray@gmail.com
