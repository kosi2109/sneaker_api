const { Order, OrderItem } = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

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
    userId: req.body.userId,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    status: req.body.status,
    total: req.body.total,
    order_items: order_items_ids,
  };

  try {
    const newOrder = new Order(data);
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.json(error.message);
  }
};

const userOrders = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) res.json("User Not Exist");

  try {
    var orders = [];
    orders = await Order.find({ userId: user._id })
      .populate("order_items")
      .sort({ order_date: -1 });

    res.json(orders);
  } catch (error) {
    res.json(error.message);
  }
};

const userOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({ order_id: orderId }).populate(
    "order_items"
  );

  if (req.userId != order.userId) res.status(404);

  try {
    const orderItems = Promise.all(
      order.order_items.map(async (a) => {
        const item = await Product.findById(String(a.item))
          .populate("brand")
          .populate("option.color")
          .populate("option.stock.size", "size");

        const color = item.option[a.option.color].color.color;
        const size = item.option[a.option.color].stock[a.option.size].size.size;
        const price = item.option[a.option.color].stock[a.option.size].price;
        const data = {
          name: item.name,
          color: color,
          size: size,
          qty: a.quantity,
          price: price,
        };
        return data;
      })
    );

    const items = await orderItems;
    let newData = {
      order_id: order.order_id,
      name: order.name,
      address: order.address,
      phone: order.phone,
      email: order.email,
      status: order.status,
      total: order.total,
      order_items: items,
    };
    res.json(newData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder, userOrders, userOrder };
