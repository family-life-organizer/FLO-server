import express from 'express';

const router = express.Router();


router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Family_org API!',
}));

router.get("/signup", (req, res) => {
  User.findOne({ where: { email: "ezekiel" } })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  return res.json("great");
});

export default router;