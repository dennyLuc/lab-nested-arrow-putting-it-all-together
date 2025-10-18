/*module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};

console.log('my name is denis');
*/

function createLoginTracker(userInfo) {
    // Ensure userInfo is an object and has the required properties
    if (typeof userInfo !== 'object' || !userInfo.username || !userInfo.password) {
        throw new Error('Invalid userInfo provided');
    }

    // Initialize attemptCount to keep track of login attempts
    let attemptCount = 0;
    const maxAttempts = 3;

    // Define the inner arrow function for handling login attempts
    const handleLoginAttempt = (passwordAttempt) => {
        // Check if the account is already locked
        if (attemptCount >= maxAttempts) {
            return 'Account is locked due to too many failed attempts.';
        }

        // Increment attemptCount on each login attempt
        attemptCount++;

        // Check if the provided password matches the user's password
        if (passwordAttempt === userInfo.password) {
            return 'Login successful!';
        } else {
            if (attemptCount >= maxAttempts) {
                return 'Login failed. Account is now locked due to too many failed attempts.';
            }
            return 'Login failed. Incorrect password.';
        }
    };

    // Initialize login feature logic here
    console.log(`Initializing login for user: ${userInfo.username}`);

    // Return an object with the login handler
    return {
        username: userInfo.username,
        loggedIn: false,
        attemptLogin: handleLoginAttempt
    };
}

// Example usage:
const userInfo = {
    username: "user1",
    password: "password123"
};

const loginTracker = createLoginTracker(userInfo);
console.log(loginTracker.attemptLogin("wrongPassword")); // "Login failed. Incorrect password."
console.log(loginTracker.attemptLogin("wrongPassword")); // "Login failed. Incorrect password."
console.log(loginTracker.attemptLogin("wrongPassword")); // "Login failed. Account is now locked due to too many failed attempts."
console.log(loginTracker.attemptLogin("password123"));