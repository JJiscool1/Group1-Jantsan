const mysql = require("mysql");
const express = require('express');
const authController = require('../controllers/auth');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const router = express.Router();
//Index
router.get('/,/index', authController.isLoggedIn, (req, res) => {
  res.render('index', {
    user: req.user
  });
});
//Index end
router.get('/, /index', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('/index', { contents: results });
    } else {
      console.log(results);
    }
  })
});
//Registr
router.get('/register', (req, res) => {
  res.render('register');
});
//Rgstr end

//Lgin
router.get('/login', (req, res) => {
  res.render('login');
});

//Lgin end

router.get('/uploadForm', (req, res) => {
  res.render('uploadForm');
});


//Updte
router.get('/update/:id', (req, res) => {

  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], async (error, results) => {
    if (error) {
      console.log(error);
    } else if (results.length > 0) {
      return res.render('update', {
        user: results[0]
      })
    }
  });
});
//Updte end

//Edt
router.get('/edit/:id', (req, res) => {

  db.query('SELECT * FROM useruploads WHERE up_id = ?', [req.params.id], async (error, results) => {
    if (error) {
      console.log(error);
    } else if (results.length > 0) {
      return res.render('edit', {
        user: results[0]
      })
    }
  });
});
//Edt end

//Mnge usr
router.get('/manageuser', (req, res) => {

  db.query('SELECT * FROM users', async (error, results) => {
    if (error) {
      console.log(error);
    } else if (results.length > 0) {
      return res.render('manageuser', {
        users: results
      })
    }
  });
});
router.get('/manageuser', (req, res) => {

  db.query('SELECT * FROM users', async (error, results) => {
    if (error) {
      console.log(error);
    } else if (results.length > 0) {
      return res.render('manageuser', {
        users: results
      })
    }
  });
});
//Mnge usr end

//Add
router.get('/adduser', (req, res) => {
  res.render('adduser');
});
//Add end

//Aus
router.get('/aboutus', (req, res) => {
  res.render('aboutus');
});
//Add end

//Dlt 
router.get('/auth/delete/manageuser', (req, res) => {
  res.render('manageuser')
})
//Dlt end

//Profl
router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

})
//Profl end

//Profl
router.get('/profile1', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render('profile1', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

})
//Profl end


//frame
router.get('/', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('index', { contents: results });
    } else {
      console.log(results);
    }
  })
});
//

//admin
router.get('/admin', (req, res) => {
  res.render('admin');
});
//admin

//see post
router.get('/posts', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('posts', { contents: results });
    } else {
      console.log(results);
    }
  })
});
//post end1
router.get('/post1', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('post1', { contents: results });
    } else {
      console.log(results);
    }
  })
});
router.get('/post2', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('post2', { contents: results });
    } else {
      console.log(results);
    }
  })
});
router.get('/post3', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('post3', { contents: results });
    } else {
      console.log(results);
    }
  })
});
router.get('/post4', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('post4', { contents: results });
    } else {
      console.log(results);
    }
  })
});
router.get('/post5', function (req, res) {
  db.query('SELECT * FROM userUploads', function (error, results, fields) {
    if (!error) {
      res.render('post5', { contents: results });
    } else {
      console.log(results);
    }
  })
});
//post1end



module.exports = router;
