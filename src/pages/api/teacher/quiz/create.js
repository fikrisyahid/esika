import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import generateCode from "@/utils/generate-code";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "POST",
    roles: "TEACHER",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const {
      title,
      timeLimit,
      minimumScore,
      difficulty,
      teacher_id: teacherId,
      questions,
    } = JSON.parse(req.body);
    if (!title || !difficulty || !teacherId) {
      throw new Error(
        "title, difficulty, and teacher_id are required to create quiz"
      );
    }

    let code = "";
    let codeIsUnique = false;
    while (!codeIsUnique) {
      code = generateCode();
      // eslint-disable-next-line no-await-in-loop
      const exists = await prisma.quiz.findUnique({
        where: {
          code,
        },
      });
      if (!exists) {
        codeIsUnique = true;
      }
    }

    // create quiz
    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        time_limit: timeLimit === 0 ? null : timeLimit,
        minimum_score: minimumScore === 0 ? null : minimumScore,
        quiz_difficulty: difficulty,
        code,
        teacherId,
      },
    });

    // create questions if questions is not empty
    const result =
      questions.length > 0
        ? await prisma.question.createMany({
            data: questions.map((question, index) => ({
              title: question.title,
              type: question.type,
              answer: question.answer,
              Hint: question.hint,
              quizId: createdQuiz.id,
              options: question.options,
              position: index + 1,
            })),
          })
        : createdQuiz;

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully create quiz",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
