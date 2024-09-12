import { checkSymbol } from "./checkSymbol.js";
import { db } from "./db.js";
import { ObjectId } from "mongodb";

const Packages = db.collection("packages"); // выбираю колекцию один раз для всех ендпоинтов
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

      res.send(result);
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
      const foundPackage =  await Packages.findOne(query)
      if (!foundPackage) {
        return res.json({ message: "Not found id" });
      }
      const updatedData = checkSymbol(foundPackage);

      const result = await Packages.updateOne(query, { $set: {updatedData} });

      if (result.modifiedCount === 0) {
        return res.json({ message: " User not found" });
      }

      res.json({ message: "user Updated successfully" });
    } catch (err) {
      console.error(err);
    }
  }

  async updateVersion(req, res) {
    try {
      const newVersion = req.body
      const query = { _id: new ObjectId(req.params.id) };
      const foundPackage =  await Packages.findOne(query)
      if (!foundPackage) {
        return res.json({ message: "Not found id" });
      }

      const result = await Packages.updateOne(query, { $set: newVersion });

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
