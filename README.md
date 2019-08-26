# Core

## About

Core server that receives and processes scraped data, and persists to the data store.


### Endpoints

* _/events (HTTP POST)_

   Accepts a JSON object representing either a single event or an array of events, and performs any necessary 
   additions and/or modifications to the data store. The web scrapers should POST events to this endpoint.  
