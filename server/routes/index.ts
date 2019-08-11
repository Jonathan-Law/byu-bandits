import express from 'express';
import todoController from '../controllers/todos';
import clashController from '../controllers/clash';

const router = express.Router();

  // Answer API requests.
router.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"You have found the api"}');
});


router.get('/api/v1/todos', todoController.getAllTodos);
router.get('/api/v1/todos/:id', todoController.getTodo);
router.post('/api/v1/todos', todoController.createTodo);
router.put('/api/v1/todos/:id', todoController.updateTodo);
router.delete('/api/v1/todos/:id', todoController.deleteTodo);

router.get('/api/clash', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"You found the clash API"}');
});
router.get('/api/clash/currentIp', clashController.getCurrentIP);

export default router;