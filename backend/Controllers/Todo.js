import Todo from "../Models/Todo.js";

export const createTodo = async (req, res) => {
  const { plan, planDate } = req.body;
  console.log(new Date(planDate), "plan,planDate");
  try {
    const newTodo = await Todo.create({
      plan,
      planDate: new Date(planDate),
    });
    res.json(newTodo);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getTodo = async (req, res) => {
  const { planDate } = req.query;
  try {
    const localDate = new Date(planDate);

    // 로컬 시간대로 변환하는 함수
    function convertToLocalTimezone(date) {
      const offset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - offset);
      return date;
    }

    const localPlanDate = convertToLocalTimezone(localDate);
    const planData = await Todo.findOne({
      where: {
        planDate: localPlanDate,
      },
    });
    // console.log(planData, "planDataplanData");
    if (planData) {
      planData.plan = JSON.parse(planData.plan);
    }
    res.json({
      result_code: 200,
      message: "Success",
      data: planData ?? [],
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id, plan } = req.body;

  try {
    const todo = await Todo.findByPk(id);
    todo.plan = JSON.stringify(plan);
    await todo.save();
    console.log("User updated:", todo.toJSON());
    res.json({
      result_code: 200,
      message: "Success",
      data: todo.toJSON(),
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
