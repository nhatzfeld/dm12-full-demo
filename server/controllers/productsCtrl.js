// ALL OUR PRODUCT FUNCTIONALITY LIVES HERE
// I would normally break the cart functionality into it's own controller

const getProducts = (req, res, next) => {
  req.app
    .get("db")
    .getProducts()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
};

const addToCart = (req, res, next) => {
  req.app
    .get("db")
    .addToCart([req.user.id, req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  getProducts,
  addToCart
};
