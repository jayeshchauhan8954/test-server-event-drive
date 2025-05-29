const { Note } = require("@src/models/app/Notes");
const { _response_message } = require("@src/utils/constants/messages");
const { _handleCatchErrors } = require("@src/utils/helpers");
const { serviceResponse } = require("@src/utils/helpers/api_response");

module.exports.createNote = async (req, res) => {
    // #swagger.tags = ['notes']
    try {
        const { id: document_id } = req.params;
        const { customer_id } = req.query;
        const { note } = req.body;

        if (!document_id || !customer_id) {
            return res.status(400).send(
                new serviceResponse({
                    status: 400,
                    errors: [{ message: _response_message.required("Document ID and Customer ID") }]
                })
            );
        }

        const newNote = new Note({
            document_id,
            customer_id,
            note,
            dateNTime: new Date()
        });

        await newNote.save();

        res.status(201).send(new serviceResponse({ status: 201, data: newNote, message: "Note created successfully" }));
    } catch (error) {
        _handleCatchErrors(error, res);
    }
};

module.exports.getNotes = async (req, res) => {
    // #swagger.tags = ['notes']
    try {
        const { id: document_id } = req.params;
        const { customer_id } = req.query;

        const query = { document_id, deletedAt: null };

        // Add customer_id to query if provided
        if (customer_id) {
            query.customer_id = customer_id;
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });

        if (!notes || notes.length === 0) {
            return res.status(200).send(
                new serviceResponse({
                    status: 200,
                    data: [],
                    message: "No notes found",
                })
            );
        }

        res.status(200).send(
            new serviceResponse({
                status: 200,
                data: notes,
                message: "Notes retrieved successfully",
            })
        );
    } catch (error) {
        _handleCatchErrors(error, res);
    }
};