export default function notFound (req, res) {
    res.status(404).json({msg : 'Resource not found'})
}