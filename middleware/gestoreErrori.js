function gestoreErrore (err, req, res, next) {
    res.status(500)
    res.json({
        error: "Internal Server Error",
        message: err.message,
    })
}

export default gestoreErrore;
