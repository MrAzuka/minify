export const checkForUserQuery = "SELECT * FROM users WHERE email = $1;"

export const insertUserQuery = "INSERT INTO users (full_name, email, password, registered) VALUES ($1, $2, $3, $4) RETURNING *;"