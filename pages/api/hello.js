// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../utils/database"


export default function handler(req, res) {
    db.connectDB();
    db.disconnectDB();
    res.status(200).json({ name: 'John Doe' })
}
