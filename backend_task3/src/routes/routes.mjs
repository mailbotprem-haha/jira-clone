import { Router } from "express";
import { Task } from "../mongoose/schemas/task.mjs";
import { checkSchema } from "express-validator";

import { createValidationSchema } from "../utils/validationSchema.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const router = Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const tasks = await Task.find({
        user: req.user.id,
      });

      return res.status(200).send(tasks);
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }
  }
);

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const foundTask = await Task.findOne({
        _id: req.params.id,
        user: req.user.id,
      });

      if (!foundTask) {
        return res.sendStatus(404);
      }

      return res.status(200).send(foundTask);
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }
  }
);

router.post(
  "/",
  authMiddleware,
  checkSchema(createValidationSchema),
  async (req, res) => {
    try {
      const newTask = new Task({
        ...req.body,
        user: req.user.id,
      });

      const savedTask =
        await newTask.save();

      return res.status(201).send(
        savedTask
      );
    } catch (err) {
      console.log(err);

      return res.sendStatus(400);
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const updatedTask =
        await Task.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user.id,
          },
          req.body,
          {
            returnDocument: "after",
            runValidators: true,
          }
        );

      if (!updatedTask) {
        return res.sendStatus(404);
      }

      return res
        .status(200)
        .send(updatedTask);
    } catch (err) {
      console.log(err);

      return res.sendStatus(400);
    }
  }
);

router.patch(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const updatedTask =
        await Task.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user.id,
          },
          req.body,
          {
            returnDocument: "after",
            runValidators: true,
          }
        );

      if (!updatedTask) {
        return res.sendStatus(404);
      }

      return res
        .status(200)
        .send(updatedTask);
    } catch (err) {
      console.log(err);

      return res.sendStatus(400);
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const deletedTask =
        await Task.findOneAndDelete({
          _id: req.params.id,
          user: req.user.id,
        });

      if (!deletedTask) {
        return res.sendStatus(404);
      }

      return res.status(200).send({
        message:
          "Task deleted successfully",
      });
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }
  }
);

export default router;