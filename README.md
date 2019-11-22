# music-library-rest-api

## Intro
This is a REST api that allows for access to database.
## Usage
1. /api/admin
Requires admin privileges

2. /api/secure
All paths will require authentication as a regular user.

3. /api/open
All paths will not require authentication to access the api.

4. PUT /api/secure/song/
Saves the JSON array for a song in the database and returns the ID.

5. POST /api/secure/song/:id
Updates the record of the given song ID with JSON array of properties sent in the body

6. GET /api/open/song
Returns a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of the results to return.

7. GET /api/open/search
Returns a list of songs matching the search criteria provided as query parameters

8. GET /api/open/reviews/:id
Returns all reviews for a given song ID

9. PUT /api/secure/add-review/:id
Create a new review for the song with the given ID based on JSON array provided in the body.

10. POST /api/admin/copyright/:id
Set of update copyright violation attributes for a given song ID. JSON array with new values is provided in the body.

11. GET /api/admin/copyright
Returns all songs which are marked as copyright violations.

12. POST /api/admin/deactivate/:id
Set or clear "account deactivated" flag for a given user.



