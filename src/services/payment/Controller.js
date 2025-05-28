const { serviceResponse } = require("@src/utils/helpers/api_response");

module.exports.paymentFun = async (req, res) => {
    try {
        const { to, from, amount, description } = req.body;

        // Validate required fields
        if (!to || !from || !amount) {
            return res.status(400).json(
                new serviceResponse({
                    status: 400,
                    errors: [{ message: "Missing required fields: to, from, and amount." }],
                })
            );
        }

        // Dummy transaction logic
        const paymentRecord = {
            from,
            to,
            amount,
            description: description || "No description provided",
            date: new Date(),
        };

        // Placeholder: Simulate payment success or failure
        const paymentSuccessful = Math.random() > 0.5;

        if (!paymentSuccessful) {
            return res.status(400).json(
                new serviceResponse({
                    status: 400,
                    message: "Payment processing failed.",
                })
            );
        }

        // Respond with success
        return res.status(200).json(
            new serviceResponse({
                status: 200,
                data: paymentRecord,
                message: "Payment processed successfully.",
            })
        );
    } catch (error) {
        console.error("Error processing payment", error);
        return res.status(500).json(
            new serviceResponse({
                status: 500,
                errors: [{ message: "An unexpected error occurred." }],
            })
        );
    }
};
