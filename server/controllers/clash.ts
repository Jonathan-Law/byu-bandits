import { Request, Response } from "express";
import fetch from 'node-fetch';
const prod_bearer = Symbol('prod_bearer');
const dev_bearer = Symbol('dev_bearer');
class ClashController {
  private [prod_bearer]: string;
  private [dev_bearer]: string;
  constructor() {
    this[prod_bearer] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUyOGE5NzVmLTZiYWYtNDVlYi1hZTRhLTBiZDc2NWRlZTMzMSIsImlhdCI6MTU2NTUwNjMzOSwic3ViIjoiZGV2ZWxvcGVyLzYyNTMzZjNiLTBjNjMtZmRmMi0wNjQ0LThhOTViNWY5M2E4YiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjU0LjE3My4yMjkuMjAwIiwiNTQuMTc1LjIzMC4yNTIiXSwidHlwZSI6ImNsaWVudCJ9XX0.9iIFYZYvnr3d6uRyXMq_uGvcrcmnbfU6VXltmmX7tnMLY22DwU_8H9bqCLhJCe6MZCq-xJxu1lW0BrE9wPWISQ';
    this[dev_bearer] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY3MDlmNzg1LTQ4NDktNGYzYi1hODk2LWNjMjA2OWUwMGU1MiIsImlhdCI6MTU2Mzc2NDg3Mywic3ViIjoiZGV2ZWxvcGVyLzYyNTMzZjNiLTBjNjMtZmRmMi0wNjQ0LThhOTViNWY5M2E4YiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjczLjIwLjkxLjEwOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.YPqVWE_fR1vbhRRcN8-_27O34z7Fwhj58PXqi9GuoeH6Zn6tx5rpiuGGOp5b0lkK-7eFaMCKNhyv-yT_9KdrDA';
  }

  private doRequest = async (req: any) => {
    try {
      const response = await req
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  public getCurrentIP = (_req: Request, _res: Response) => {
    return require('dns').lookup(require('os').hostname(), function (_err: any, add: any, _fam: any) {
      _res.status(200).send({
        success: 'true',
        message: 'IP Retrieved Successfully',
        ip: add
      });
    });
  }

  public searchClans = (_req: Request, _res: Response) => {
    // https://api.clashofclans.com/v1/clans?name=BYU%20Bandits&warFrequency=1&locationId=1&minMembers=1&maxMembers=1&minClanPoints=1&minClanLevel=1&limit=1&after=1&before=1
    const url: string = 'https://api.clashofclans.com/v1/clans?name=BYU%20Bandits';
    const env = process.env.NODE_ENV || 'dev';
    const _bearer = env === 'production' ? this[prod_bearer] : this[dev_bearer];
    console.log(env);
    const r = fetch(url, {
      method: 'get',
      headers: { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${_bearer}`
      },
    });
    return this.doRequest(r).then((data) => {
      return _res.status(200).send({success: 'true', message: 'Searched for clan', data});
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

const clashController = new ClashController();
export default clashController;