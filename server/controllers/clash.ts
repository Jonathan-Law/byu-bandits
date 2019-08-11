import { Request, Response } from "express";
import fetch from 'node-fetch';
const bearer = Symbol('bearer');
class ClashController {
  private [bearer]: string;
  constructor() {
    this[bearer] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjNhYTgxNmY0LTJjMzQtNGFlMi05ZGYzLTk0NGEyNjY0MzFmNyIsImlhdCI6MTU2NTUwMDMyNiwic3ViIjoiZGV2ZWxvcGVyLzYyNTMzZjNiLTBjNjMtZmRmMi0wNjQ0LThhOTViNWY5M2E4YiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjUyLjg3LjU2LjM2Il0sInR5cGUiOiJjbGllbnQifV19.uQzxbpvfWGIbHqq636dW70u6Qn8JBN94EkuGDKF1aaR5ek2nyf6BePUl7_8OlvuezlkdJo9CwKHmfFJRxUFVpw';
  }
  getCurrentIP(_req: Request, _res: Response) {
    return require('dns').lookup(require('os').hostname(), function (_err: any, add: any, _fam: any) {
      _res.status(200).send({
        success: 'true',
        message: 'IP Retrieved Successfully',
        ip: add
      });
    });
  }

  searchClans(_req: Request, _res: Response){
    // https://api.clashofclans.com/v1/clans?name=BYU%20Bandits&warFrequency=1&locationId=1&minMembers=1&maxMembers=1&minClanPoints=1&minClanLevel=1&limit=1&after=1&before=1
    const url = 'https://api.clashofclans.com/v1/clans?name=BYU%20Bandits';
    const _bearer = this[bearer];
    return fetch(url, {
      method: 'get',
      headers: { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${_bearer}`
      },
    })
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

const clashController = new ClashController();
export default clashController;