import rateLimit from 'express-rate-limit';


const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 10, 
    keyGenerator: (req) => {
        
        return req.headers['x-api-key'];
    },
    handler: (req, res, ) => {
        res.status(429).json({
            message: "Too many requests, please try again later."
        });
    },
    onLimitReached: (req, res, optionsUsed) => {
        console.log(`Rate limit reached for ${req.headers['x-api-key']}`);
    }
});

export default limiter;
