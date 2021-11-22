const { Order, OrderItem } = require("../models/order");
const Product = require("../models/product");

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

const createOrder = async (req, res) => {
  let order_items_ids = Promise.all(
    req.body.order_items.map(async (i) => {
      let product = await Product.findById(i.item)
        .populate("option.color")
        .populate("option.stock.size");

      let updateQuantity =
        product.option[i.option.color].stock[i.option.size].stock - i.quantity;
      let item = new OrderItem({
        item: i.item,
        quantity: i.quantity,
        option: i.option,
      });
      product.option[i.option.color].stock[i.option.size].stock =
        updateQuantity;
      await product.save();

      item = await item.save();
      return item._id;
    })
  );
  order_items_ids = await order_items_ids;
  const data = {
    order_id: req.body.order_id,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    status: req.body.status,
    order_items: order_items_ids,
  };

  try {
    const newOrder = new Order(data);
    await newOrder.save()
    res.json(newOrder);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { getOrders, createOrder };
