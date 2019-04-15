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
- Pgadmin

## How to use?
1) Clone the project to your local machine.
2) `cd stockx_test/app`
3) Run `npm install`
4) `cd ..` to go back to `stockx_test`
5) Run `docker-compose up` and wait for all the containers to start up
6) You can hit http://localhost:3000/ to check if the server is running
7) You can also access Pgadmin at http://localhost:8080 to look at the DB visually
8) You can use postman or curl to make a request to the endpoint
9) CURL example: `curl -X POST \
  http://localhost:3000/api/v1/shoe_reading \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: bde1c580-050e-4921-97fd-5ac3248ce9ff' \
  -H 'cache-control: no-cache' \
  -d '{
	"shoe_name": "New shoe1",
	"shoe_size": "5"
}'`
10) The systems keeps a running average. If a shoe_name does not exist, it creates one. Else, it updates the count and average.

## Note
We could have potentially kept a list of each entry as it came in to the app as a seperate entry in the database. However, it wasn't clear to me what extra value that would have provided. 

## Contact
shiva.ray@gmail.com
