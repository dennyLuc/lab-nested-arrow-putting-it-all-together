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
        // Check if the provided password matches the user's password
        if (passwordAttempt === userInfo.password) {
            // Reset attemptCount on successful login
            attemptCount = 0;
            return 'Login successful';
        }

        // Increment attemptCount on each failed login attempt
        attemptCount++;

        // Check if attemptCount exceeds maxAttempts
        if (attemptCount > maxAttempts) {
            return 'Account locked due to too many failed login attempts';
        } else {
            return `Attempt ${attemptCount}: Login failed`;
        }
    };

    // Return the login handler function
    return handleLoginAttempt;
}

// Example usage:
const userInfo = {
    username: "user1",
    password: "password123"
};

const loginAttempt = createLoginTracker(userInfo);
console.log(loginAttempt("wrongPassword")); // "Attempt 1: Login failed"
console.log(loginAttempt("wrongPassword")); // "Attempt 2: Login failed"
console.log(loginAttempt("wrongPassword")); // "Attempt 3: Login failed"
console.log(loginAttempt("password123"));   // "Account locked due to too many failed login attempts"
console.log(loginAttempt("password123"));   // "Account locked due to too many failed login attempts"