import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers   // ✅ change here

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized Login Again' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.email !== process.env.ADMIN_EMAIL) {   // ✅ correct check
            return res.status(401).json({ success: false, message: 'Not Authorized Login Again' })
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: error.message })
    }
}

export default authAdmin;