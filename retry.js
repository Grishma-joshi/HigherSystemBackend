const retry = require('retry');

const operation = retry.operation({
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 30000,
    randomize: true,
});

operation.attempt(currentAttempt => {
    // Your database connection logic here
});
module.exports=operation