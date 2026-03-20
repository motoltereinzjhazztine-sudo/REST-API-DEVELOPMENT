Markdown
# RESTful API Activity - [Your Name]
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
- <img width="1366" height="768" alt="Screenshot 2026-03-20 102447" src="https://github.com/user-attachments/assets/9383c96d-f2be-422a-9b58-9419fe066f17" />
