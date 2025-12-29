/**
 * Global error handling middleware.
 * Ensures consistent error responses and prevents sensitive data leaks.
 */
export const errorHandler = (err, req, res, next) => {
    // Log the detailed error for backend debugging
    console.error("Internal Error:", err);

    // Return a standardized JSON response
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        status: "error",
        error: message,
        // Avoid sending stack traces to the client in production
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};
