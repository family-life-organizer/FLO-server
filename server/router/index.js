import express from 'express';

const router = express.Router();


router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Family_org API!',
}));


export default router;