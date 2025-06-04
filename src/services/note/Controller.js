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

module.exports.editNote = async (req, res) => {
    // #swagger.tags = ['notes']
    try {
        const { note_id: id } = req.params;
        const { note } = req.body;

        if (!id || !note) {
            return res.status(400).send(
                new serviceResponse({
                    status: 400,
                    errors: [{ message: _response_message.required("Note ID and Note content") }]
                })
            );
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { note, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).send(
                new serviceResponse({
                    status: 404,
                    errors: [{ message: "Note not found" }]
                })
            );
        }

        res.status(200).send(
            new serviceResponse({
                status: 200,
                data: updatedNote,
                message: "Note updated successfully",
            })
        );
    } catch (error) {
        _handleCatchErrors(error, res);
    }
};

module.exports.softDeleteNote = async (req, res) => {
    // #swagger.tags = ['notes']
    try {
        const { note_id: id } = req.params;

        if (!id) {
            return res.status(400).send(
                new serviceResponse({
                    status: 400,
                    errors: [{ message: _response_message.required("Note ID") }]
                })
            );
        }

        const deletedNote = await Note.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        );

        if (!deletedNote) {
            return res.status(404).send(
                new serviceResponse({
                    status: 404,
                    errors: [{ message: "Note not found" }]
                })
            );
        }

        res.status(200).send(
            new serviceResponse({
                status: 200,
                data: deletedNote,
                message: "Note deleted successfully",
            })
        );
    } catch (error) {
        _handleCatchErrors(error, res);
    }
};