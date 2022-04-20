export const checkForUserQuery = "SELECT * FROM users WHERE email = $1;"

export const insertUserQuery = "INSERT INTO users (full_name, email, password, registered) VALUES ($1, $2, $3, $4) RETURNING *;"

export const insertUserFileQuery = "INSERT INTO user_file (file_url, user_id)  VALUES ($1, $2) RETURING *;"

export const deleteAllUsers = "DELETE * FROM users;"

export const deleteOneUser = "DELETE * FROM users WHERE email = $1;"

