import * as MessageModel from "../models/message.model.js"
import errorHandler from "../helpers/error-handler.js"

export const getAll = async function (request, response) {
  try {
      const { id } = request.params;
      const { rows: results, pageInfo } =
          await MessageModel.findAllByMessageId(request.query, id);
      if (!results) {
          throw Error("nothing message");
      }
      return response.json({
          success: true,
          message: "Get message success",
          pageInfo,
          results,
      });
  } catch (error) {
      return errorHandler(response, error);
  }
};

export const createMessage = async function (request, response) {
  try {
      const { id } = request.user;
      const data = {
          ...request.body,
          userId: id,
      };
      const comment = await MessageModel.insert(data);
      if (!comment) {
          throw Error("create message failed");
      }
      return response.json({
          success: true,
          message: "Create message success",
          results: comment,
      });
  } catch (error) {
      return errorHandler(response, error);
  }
};
