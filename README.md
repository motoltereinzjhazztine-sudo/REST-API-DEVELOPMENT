Markdown
# RESTful API Activity - [Tereinz Jhazztine M. Motol]
## Best Practices Implementation
**1. Environment Variables:**
- Why did we put `BASE_URI` in `.env` instead of hardcoding it?
- - Answer: ... -We put BASE_URI in .env so it can be easily changed per environment without modifying the code, keeping the app flexible and maintainable.
**2. Resource Modeling:**
- Why did we use plural nouns (e.g., `/dishes`) for our routes?
- Answer: ... -We use plural nouns for routes because they represent collections of resources and follow REST API conventions.
**3. Status Codes:**
- When do we use `201 Created` vs `200 OK`?
  -Use `201 Created` when a new resource is made, and `200 OK` when a request succeeds without creating one.
- Why is it important to return `404` instead of just an empty array or a generic error?
- Answer: ...-404 clearly shows a resource doesn’t exist, unlike an empty array or generic error.
**4. Testing:**
- <img width="1366" height="768" alt="Screenshot 2026-03-20 121253" src="https://github.com/user-attachments/assets/249a2259-f023-4803-b60f-dd2550b4e65c" />
**Activity #3
- Why did I choose to Embed the Maintenance Log?
- Answer: I embedded the maintenanceLog because repair history is specific to a single Room; keeping them together allows for faster data retrieval in a single query.
- Why did I choose to Reference the Guest?
- Answer: I referenced the Guest in the Booking model to avoid data duplication; this ensures that if a guest's profile changes, it updates across all their separate reservations automatically.
**Acitivity #4
1. Authentication vs Authorization
- What is the difference between Authentication and Authorization in our code?
- Answer: Authentication is the process of verifying who a user is. Authorization is the process of verifying what an authenticated user is allowed to do.
2. Security (bcrypt)
- Why did we use bcryptjs instead of saving passwords as plain text in MongoDB?
- Answer: We use bcryptjs to protect user data, it "hashes" passwords into a non-reversible string so that even if the database is compromised, an attacker cannot read the actual passwords.
3. JWT Structure
- What does the protect middleware do when it receives a JWT from the client?
- Answer: It extracts the token from the header, verifies its digital signature using the secret key, and attaches the decoded user information to the request object.
