# Core

## About

Core server that receives and processes scraped data, and persists to the data store.


### Endpoints

* _/events (HTTP GET)_

   Returns a JSON array containing all Events in the data store.   

* _/events (HTTP POST)_

   Accepts a JSON object representing either a single event or an array of events, and performs any necessary 
   additions and/or modifications to the data store. The web scrapers should POST events to this endpoint.
   
### Configuration

The following environment variables are used to configure the service, some of these are required for the service to 
connect to the data store.

 * __PGUSER__:  The username of the account used to connect to the database
 * __PGPASSWORD__: The password for the account used to connect to the database
 * __PGHOST__: The database host
 * __PGDATABASE__: The name of the database to which the service will connect
 * __DB_PORT__: _(Optional)_ The database host port, defaults to 5432
 * __PORT__: _(Optional)_ The port on which the web server will listen, defaults to 3000

