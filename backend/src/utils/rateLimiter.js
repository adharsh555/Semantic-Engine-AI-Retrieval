import rateLimit from "express-rate-limit";

/**
 * Basic rate limiting to protect AI endpoints from abuse.
 * Limits each IP to 60 requests per minute.
 */
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60,             // limit each IP to 60 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers,
    message: {
        status: "error",
        error: "Too many requests, please try again later."
    }
});
