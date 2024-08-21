import { Request, Response } from "express";
import Razorpay from "razorpay";
import db from "../db";

export const order = async (req: Request, res: Response) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Some error occured" });
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some error occured" });
  }
};
