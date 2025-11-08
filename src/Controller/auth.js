const bcrypt = require('bcryptjs')
const userModel = require('../Model/userModel')
const jwt = require('jsonwebtoken');


exports.userSignUp = async (req, res) => {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).send({ status: false, msg: 'All fields are require' })

        const existing = await userModel.findOne({ email: email })
        if (existing) return res.status(400).send({ status: false, msg: 'Email already exist' })

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const user = await userModel.create({ name, email, password: hashPass })
        return res.status(200).send({ status: true, msg: 'User created successfully', user })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ status: false, msg: 'Internal Server Error' })
    }
}

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ status: false, msg: 'All fields are required' });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).send({ status: false, msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).send({ status: false, msg: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    return res.status(200).send({status: true,msg: 'Login successful',token,
      user: { _id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: false, msg: 'Internal Server Error' });
  }
};