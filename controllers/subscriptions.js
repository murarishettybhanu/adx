const Subscription = require('../database/models/subscription')

module.exports = async (req, res) => {
  const subscriptions = await Subscription.find({});

  res.render("subscriptions", {
    subscriptions
  });
}