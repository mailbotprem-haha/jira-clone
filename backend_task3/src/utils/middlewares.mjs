export const resolveIndexID = (req, res, next) => {
const parsedId = parseInt(req.params.id);

if (isNaN(parsedId))
        return res.sendStatus(400);
 const findTaskIndex = tasks.findIndex(
        (task) => task.id === parsedId
    );
 if (findTaskIndex === -1)
        return res.sendStatus(404);
 req.findTaskIndex = findTaskIndex;
  next();
};