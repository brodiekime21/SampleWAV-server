const Sample = require('../models/Sample');

const getSample = async (req, res, next) => {
    try {
      const sample = await Sample.findById(req.params.id);
      if (sample == null) {
        return res.json({ message: 'Cannot find Sample' });
      }
      res.sample = sample;
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  }

module.exports = getSample; 