# music-library-rest-api

## Intro
This is a REST api that allows for access to database.
## Usage
1. /api/admin DONE
Requires admin privileges

2. /api/secure DONE
All paths will require authentication as a regular user.

3. /api/open DONE 
All paths will not require authentication to access the api.

4. PUT /api/secure/song/ DONE
Saves the JSON array for a song in the database and returns the ID.

5. POST /api/secure/song/:id DONE
Updates the record of the given song ID with JSON array of properties sent in the body

6. GET /api/open/song DONE
Returns a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of the results to return.

7. GET /api/open/search DONE
Returns a list of songs matching the search criteria provided as query parameters

8. GET /api/open/reviews/:id DONE
Returns all reviews for a given song ID

9. PUT /api/secure/add-review/:id DONE
Create a new review for the song with the given ID based on JSON array provided in the body.

10. POST /api/admin/copyright/:id DONE
Set of update copyright violation attributes for a given song ID. JSON array with new values is provided in the body.

11. GET /api/admin/copyright DONE
Returns all songs which are marked as copyright violations.

12. POST /api/admin/deactivate/:id
Set or clear "account deactivated" flag for a given user.



