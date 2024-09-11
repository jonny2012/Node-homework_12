import { db } from "./db.js";
import { ObjectId } from "mongodb";

const Packages = db.collection("packages"); // выбираю колекцию один раз для всех ендпоинтовь
class Controller {
  async getAll(req, res) {
    try {
      const result = await Packages.find().toArray();

      res.json(result);
    } catch (err) {
      console.error(err);
    }
  }

  async getOne(req, res) {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await Packages.findOne(query);
      const arrnew = JSON.parse(JSON.stringify(result).replace(/^/g, ""));
      res.send(arrnew);
    } catch (err) {
      console.error(err);
    }
  }
  async create(req, res) {
    try {
      const newPackage = req.body;
      const result = await Packages.insertOne(newPackage);
      res.json(result);
    } catch (err) {
      console.error(err);
    }
  }
  async updateOne(req, res) {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const foundPackage = Packages.findOne(query);
      if (!foundPackage) {
        return res.json({ message: "Not found id" });
      }
      const updates = { $push: req.body };
      const result = await Packages.updateOne(query, updates);

      if (result.modifiedCount === 0) {
        return res.json({ message: " User not found" });
      }

      res.json({ message: "user Updated successfully" });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteOne(req, res) {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const foundPackage = Packages.findOne(query);
      if (!foundPackage) {
        return res.json({ message: "Not found id" });
      }
      const result = await Packages.deleteOne(query);
      res.json(result);

      res.json(result);
    } catch (err) {
      console.error(err);
    }
  }
}
export default new Controller();
