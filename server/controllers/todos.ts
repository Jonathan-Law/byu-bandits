import { Request, Response } from 'express';

/* eslint-disable class-methods-use-this */
class TodosController {
  getAllTodos(_req: Request, _res: Response) {
    return _res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      // todos: db,
    });
  }

  getTodo(_req: Request, _res: Response) {
    const id = parseInt(_req.params.id, 10);
    // db.map((todo) => {
    //   if (todo.id === id) {
    //     return _res.status(200).send({
    //       success: 'true',
    //       message: 'todo retrieved successfully',
    //       todo,
    //     });
    //   }
    // });
    return _res.status(404).send({
      success: 'false',
      message: 'todo does not exist',
    });
  }

  createTodo(_req: Request, _res: Response) {
    if (!_req.body.title) {
      return _res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!_req.body.description) {
      return _res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }
    const todo = {
      // id: db.length + 1,
      title: _req.body.title,
      description: _req.body.description,
    };
    // db.push(todo);
    return _res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      todo,
    });
  }

  updateTodo(_req: Request, _res: Response) {
    const id = parseInt(_req.params.id, 10);
    let todoFound;
    let itemIndex;
    // db.map((todo, index) => {
    //   if (todo.id === id) {
    //     todoFound = todo;
    //     itemIndex = index;
    //   }
    // });

    if (!todoFound) {
      return _res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

    if (!_req.body.title) {
      return _res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!_req.body.description) {
      return _res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    // const newTodo = {
    //   id: todoFound.id,
    //   title: _req.body.title || todoFound.title,
    //   description: _req.body.description || todoFound.description,
    // };

    // db.splice(itemIndex, 1, newTodo);

    return _res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      // newTodo,
    });
  }

  deleteTodo(_req: Request, _res: Response) {
    const id = parseInt(_req.params.id, 10);
    let todoFound;
    let itemIndex;
    // db.map((todo, index) => {
    //   if (todo.id === id) {
    //     todoFound = todo;
    //     itemIndex = index;
    //   }
    // });

    if (!todoFound) {
      return _res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }
    // db.splice(itemIndex, 1);

    return _res.status(200).send({
      success: 'true',
      message: 'Todo deleted successfuly',
    });
  }
}

const todoController = new TodosController();
export default todoController;
