const router = require("express").Router();
const Task = require("../model/taskModel");
const auth = require("../middleware/auth");

// ADD TASK
router.get("/task", auth, async (req, res) => {
  try {
    await req.user.populate("tasks").execPopulate();
    res.render("task", {
      tasks: req.user.tasks,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/task", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.redirect("/task");
  } catch (error) {
    console.log(error);
  }
});

// EDIT TASK
router.get("/task/edit/:id", auth, async (req, res) => {
  const editTask = await Task.findByIdAndRemove(req.params.id);
  editTask.save();
  await req.user.populate("tasks").execPopulate();
  res.render("task", {
    editTask,
    tasks: req.user.tasks,
  });
});

router.patch("/task/edit/:id", auth, async (req, res) => {
  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body);
  await updateTask.save();

  res.redirect("task");
});

// DELETE TASK
router.get("/task/delete/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    res.redirect("/task");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
