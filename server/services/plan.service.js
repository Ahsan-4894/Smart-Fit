import { GlobalErrorHandler } from "../utils/utility.js";
import { PlanModel } from "../models/plan.model.js";
import { uploadFilesToCloudinary } from "../utils/features.js";
import { StatusCodes } from "http-status-codes";

class PlanService {
  static getAllPlans = async () => {
    try {
      // Fetch all plans.
      const plans = await PlanModel.find();
      if (plans.length === 0)
        throw new GlobalErrorHandler("No plans found", StatusCodes.NOT_FOUND);

      const transformedPlans = plans.map((row) => ({
        id: row._id,
        imageUrl: row.image,
        title: row.title,
        type: row.type,
        difficulty: row.difficulty,
        duration: row.duration,
        description: row.description,
        price: row.price,
        features: row.features,
        availability: row.availability,
      }));
      return transformedPlans;
    } catch (err) {
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  static addNewPlan = async (plan, file = []) => {
    try {
      const {
        title,
        type,
        difficulty,
        duration,
        description,
        price,
        features,
        availability,
      } = plan;

      // Check wether two plans doesn't have same title.
      const isPlanExists = await PlanModel.findOne({ title: title });
      if (isPlanExists)
        throw new GlobalErrorHandler(
          "Plan already exists",
          StatusCodes.CONFLICT
        );
      console.log(isPlanExists);

      if (!file)
        return next(
          new ErrorHandler("Please upload Plan Image", StatusCodes.BAD_REQUEST)
        );

      const result = await uploadFilesToCloudinary([file]);

      const { public_id, imgUrl } = result[0];
      const newPlan = await PlanModel.create({
        title,
        type,
        difficulty,
        duration,
        description,
        price: parseInt(price),
        features: features.split(","),
        availability,
        image: imgUrl,
        public_id,
      });

      return newPlan;
    } catch (err) {
      console.log(err);
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  static editPlan = async (plan) => {
    try {
      const {
        id,
        title,
        type,
        difficulty,
        duration,
        description,
        price,
        features,
        availability,
      } = plan;

      // Check wether plan exists or not.
      const isPlanExists = await PlanModel.findById(id);
      if (!isPlanExists)
        throw new GlobalErrorHandler("Plan not found", StatusCodes.NOT_FOUND);

      // Check wether two plans doesn't have same title.
      const isPlanExistsWithSameTitle = await PlanModel.findOne({
        title: title,
      });
      if (isPlanExistsWithSameTitle)
        throw new GlobalErrorHandler(
          "Plan already exists",
          StatusCodes.CONFLICT
        );

      const updatedPlan = await PlanModel.findByIdAndUpdate(id, {
        title,
        type,
        difficulty,
        duration,
        description,
        price: parseInt(price),
        features: features.split(","),
        availability,
      });
      return updatedPlan;
    } catch (err) {
      console.log(err);
      if (err instanceof GlobalErrorHandler) throw err;
      throw new GlobalErrorHandler(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}
export default PlanService;
