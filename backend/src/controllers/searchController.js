import { semanticSearch } from "../services/searchService.js";

/**
 * HTTP handler for semantic search.
 * GET /api/search?q=query&limit=5
 */
export const searchContent = async (req, res) => {
    try {
        const { q, limit } = req.query;

        if (!q) {
            return res.status(400).json({
                error: "Query parameter 'q' is required",
                status: "fail"
            });
        }

        // Professionals handle type conversion and provide sensible defaults
        const searchLimit = parseInt(limit, 10) || 5;

        const results = await semanticSearch({
            query: q,
            limit: searchLimit,
        });

        res.json({
            status: "success",
            query: q,
            count: results.length,
            results,
        });
    } catch (error) {
        console.error("Search Controller Error:", error);
        res.status(500).json({
            status: "error",
            error: "Semantic search failed",
            message: error.message
        });
    }
};
