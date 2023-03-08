const Pack = require('../models/Pack');

const getPack = async (req, res, next) => {
    try {
      const pack = await Pack.findById(req.params.id);
      if (pack == null) {
        return res.json({ message: 'Cannot find the Pack' });
      }
      res.pack = pack;
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  }

module.exports = getPack; 