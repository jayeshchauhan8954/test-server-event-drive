const { Favorite } = require("@src/models/app/Favorite");
const { _response_message } = require("@src/utils/constants/messages");
const { _handleCatchErrors } = require("@src/utils/helpers");
const { serviceResponse } = require("@src/utils/helpers/api_response");

/**
 * Create a new favorite or update an existing one (toggle).
 * The 'favorite' field in the request body (boolean) determines the new state of the 'note' field.
 */
module.exports.createFavorite = async (req, res) => {
    // #swagger.tags = ['Favorite']
    try {
        const { id: document_id } = req.params;
        const { customer_id } = req.query;
        const { favorite } = req.body;

        if (!document_id || !customer_id) {
            return res.status(400).send(
                new serviceResponse({
                    status: 400,
                    errors: [{ message: _response_message.required("Document ID and Customer ID") }]
                })
            );
        }

        if (typeof favorite !== 'boolean') {
            return res.status(400).send(
                new serviceResponse({
                    status: 400,
                    errors: [{ message: "The 'favorite' field in the body must be a boolean." }]
                })
            );
        }

        const updatedFavorite = await Favorite.findOneAndUpdate(
            { document_id, customer_id },
            { $set: { note: favorite, document_id, customer_id } },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );

        let message = "Favorite status updated successfully.";
        if (updatedFavorite.createdAt.getTime() === updatedFavorite.updatedAt.getTime()) { // Heuristic for creation
            message = "Favorite created successfully.";
        }

        res.status(200).send(
            new serviceResponse({
                status: 200,
                data: updatedFavorite,
                message: message
            })
        );

    } catch (error) {
        _handleCatchErrors(error, res);
    }
};

/**
 * Get favorites, filtered by document_id and optionally by customer_id.
 */
module.exports.getFavorites = async (req, res) => {
    // #swagger.tags = ['favorite']
    try {
        const { id: document_id } = req.params;
        const { customer_id } = req.query;

        if (!document_id) {
            return res.status(400).send(
                new serviceResponse({
                    status: 400,
                    errors: [{ message: _response_message.required("Document ID") }]
                })
            );
        }

        const query = { document_id, deletedAt: null };

        if (customer_id) {
            query.customer_id = customer_id;
        }

        const favorites = await Favorite.find(query).sort({ createdAt: -1 });

        if (!favorites || favorites.length === 0) {
            return res.status(200).send(
                new serviceResponse({
                    status: 200,
                    data: [],
                    message: "No favorites found for the given criteria.",
                })
            );
        }

        res.status(200).send(
            new serviceResponse({
                status: 200,
                data: favorites,
                message: "Favorites retrieved successfully.",
            })
        );
    } catch (error) {
        _handleCatchErrors(error, res);
    }
};