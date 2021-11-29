const { Order, OrderItem } = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user")


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


const userOrders = async (req,res)=>{
  const {id} = req.params
  const user = await User.findById(id)
  if(!user) res.json("User Not Exist")

  try {
    var orders = [];
    orders = await Order.find({userId:user._id}).populate("order_items")

    res.json(orders)
  } catch (error) {
    res.json(error.message)
  }

}

const userOrder = async (req,res)=>{
  // const {userId,orderId} = req.params
  // const user = await User.findById(userId)
  // const order = await Order.findById(orderId)

  // if(!user) res.json("User Not Exist")
  // if(!order) res.json("Order Not Exist")
  // if (order.userId !== user.id) res.json("You are not Authenticated")
  // try {
    
  //   const order = await Order.findById(orderId).populate("order_items")
  //   res.json(order)
  // } catch (error) {
  //   res.json(error.message)
  // }

}

module.exports = {  createOrder ,userOrders , userOrder};
