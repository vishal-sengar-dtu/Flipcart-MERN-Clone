const Product = require('../models/product')
const shortid = require('shortid')
const slugify = require('slugify')

exports.createProduct = ((req, res, next) => {

    //res.status(200).json({ files: req.files, body: req.body })

    const { name, price, quantity, description, category } = req.body;
    let productPictures = []

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    })

    product.save((err, product) => {
        if (err) return res.status(400).json({ err });
        if (product) {
            res.status(201).json({ product })
        }
    })
})