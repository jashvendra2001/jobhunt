import jwt from 'jsonwebtoken';

const isAuthentication = async (req, res, next) => {
    try {
        // Access token from cookies (update 'authToken' if you're using a different key)
        const token = req.cookies.authToken;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Verify the token
        const tokenVerify = await jwt.verify(token, process.env.SECRET_KEY);

        if (!tokenVerify) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach userId to the request object for further usage
        req.id = tokenVerify.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);

        // Handle server errors and return a response to the client
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export default isAuthentication;
