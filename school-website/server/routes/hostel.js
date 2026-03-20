const express = require('express');
const router = express.Router();

router.get('/info', (req, res) => {
  const hostelInfo = {
    boys: {
      capacity: 200,
      available: 45,
      fee: 4500,
      facilities: ['24/7 Security', 'Wi-Fi', 'Study Hall', 'Dining', 'Indoor Games', 'Medical Room', 'Laundry'],
      warden: 'Mr. Rajesh Kumar',
      contact: '+91 98765 43210',
    },
    girls: {
      capacity: 150,
      available: 30,
      fee: 4500,
      facilities: ['24/7 CCTV', 'Wi-Fi', 'Study Hall', 'Dining', 'Indoor Games', 'Medical Room', 'Salon', 'Laundry'],
      warden: 'Mrs. Sunita Sharma',
      contact: '+91 98765 43211',
    },
    rules: [
      'Mobile phones not permitted on weekdays',
      'Visiting hours: Sundays 10 AM - 5 PM',
      'Lights out: 10:30 PM',
      'Mandatory study hours: 7 PM - 9 PM',
    ],
    mealtimes: {
      breakfast: '7:00 AM - 8:00 AM',
      lunch: '12:30 PM - 1:30 PM',
      snacks: '4:30 PM - 5:00 PM',
      dinner: '7:30 PM - 8:30 PM',
    },
  };
  res.json({ success: true, data: hostelInfo });
});

module.exports = router;
