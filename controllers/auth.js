const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const fileUpload = require("express-fileupload");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//Lgin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if (!results || !(password)) {
        res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        })
      } else {
        const id = results[0].id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/profile");
      }

    })

  } catch (error) {
    console.log(error);
  }
}

//Rgstr
exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.render('register', {
        message: 'That email is already in use'
      })
    } else if (password !== passwordConfirm) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }

    db.query('INSERT INTO users SET ?', { name: name, email: email, password }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('register', {
          message: 'User registered'
        });
      }
    })


  });

}

exports.isLoggedIn = async (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log(decoded);

      //2) Check if the user still exists
      db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
        console.log(result);

        if (!result) {
          return next();
        }

        req.user = result[0];
        console.log("user is")
        console.log(req.user);
        return next();

      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
}

exports.logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true
  });

  res.status(200).redirect('/');
}


//co
exports.update = (req, res) => {
  console.log(req.body);

  const { name, email } = req.body;

  db.query('UPDATE users SET name=?, email=? WHERE id=?', [name, email, req.params.id], (error, results) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log(results);
      return res.redirect('/profile');
    }
  })
}

//coco
exports.deleteUser = (req, res) => {
  console.log(req.body);

  db.query('DELETE FROM users WHERE id=?', [req.params.id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      res.status(200).redirect('/manageuser')
    }

  })

};

//cococo
exports.adduser = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.render('adduser', {
        message: 'That email is already in use'
      })
    } else if (password !== passwordConfirm) {
      return res.render('adduser', {
        message: 'Passwords do not match'
      });
    }
    db.query('INSERT INTO users SET ?', { name: name, email: email, password }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        return res.redirect('/manageuser');
      }
    })


  });

}

//
exports.uploadForm = (req, res) => {
  const {
    user_id,
    up_id,
    image_f,
    header_f,
    highlight_f,
    main_f,
    header,
    firstp,
    secondp,
    thirdp,
    endp,
    imagem1,
    imagem2,
    ink
  } = req.body
  const photo = req.files.image;
  var photoName = photo.name;

  photo.mv('./public/images/' + photoName);

  db.query('INSERT INTO useruploads SET ? ', { header_f: header_f, highlight_f: highlight_f, main_f: main_f, header: header, firstp: firstp, secondp: secondp, thirdp: thirdp, endp: endp, link: link, imagem1: photoName, imagem2: photoName, image_f: photoName }, (error, results) => {

    if (error) {
      console.log(error);
    } else {
      console.log(results);
      res.redirect('/')
    }
  })
}

//cocococoocooco
exports.edit = (req, res) => {
  console.log(req.body);

  const {
    header,
    highlight,
    main
  } = req.body;

  db.query('UPDATE users SET header=?, highlight=?, main=? WHERE up_id=?', [header, highlight, main, req.params.id], (error, results) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log(results);
      return res.redirect('/profile');
    }
  })
}

//admin
exports.admin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('admin', {
        message: 'Please provide an email and password'
      })
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if (!results || !(password)) {
        res.status(401).render('admin', {
          message: 'Email or Password is incorrect'
        })
      } else {
        const id = results[0].id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/profile1");
      }

    })

  } catch (error) {
    console.log(error);
  }
}
