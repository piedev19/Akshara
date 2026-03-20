const express = require('express');
const router = express.Router();

router.get('/routes', (req, res) => {
  const routes = [
    { id: 1, routeName: 'Route A - North Zone', stops: ['Railway Station', 'Civil Lines', 'Sector 12', 'School'], timing: '7:15 AM', fee: 1800 },
    { id: 2, routeName: 'Route B - South Zone', stops: ['Bus Stand', 'Market Square', 'Green Park', 'School'], timing: '7:30 AM', fee: 1800 },
    { id: 3, routeName: 'Route C - East Zone', stops: ['Airport Road', 'IT Hub', 'Lakeside', 'School'], timing: '7:20 AM', fee: 2000 },
    { id: 4, routeName: 'Route D - West Zone', stops: ['Mall Road', 'University Area', 'Hill View', 'School'], timing: '7:25 AM', fee: 2000 },
    { id: 5, routeName: 'Route E - Central Zone', stops: ['City Center', 'Collector Office', 'Park Colony', 'School'], timing: '7:40 AM', fee: 1600 },
  ];
  res.json({ success: true, data: routes });
});

module.exports = router;
