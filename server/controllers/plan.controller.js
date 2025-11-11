import { StatusCodes } from "http-status-codes";
import PlanService from "../services/plan.service.js";

class PlanController {
  static getAllPlans = async (req, res, next) => {
    try {
      const plans = await PlanService.getAllPlans();
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Plans fetched successfully",
        plans,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };

  static addPlan = async (req, res, next) => {
    try {
      const plan = req.body;
      const newPlan = await PlanService.addNewPlan(plan, req.file);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Plan added successfully",
        plan: newPlan,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };

  static editPlan = async (req, res, next) => {
    try {
      const plan = req.body;
      const updatedPlan = await PlanService.editPlan(plan);
      res.status(StatusCodes.OK).json({
        ok: true,
        message: "Plan updated successfully",
        plan: updatedPlan,
      });
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: err.message || "Something went wrong",
      });
    }
  };
}

export default PlanController;
