module.exports = function(req, res, next) {
    userId = req.user.user.id
    feedId = req.body.user
    if (userId === feedId) {
        next()
    } else {
        return res.status(403).json("Forbidden access")
    }
}