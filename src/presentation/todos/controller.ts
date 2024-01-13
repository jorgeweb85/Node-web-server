import { Request, Response } from "express"
import { json } from "stream/consumers";


let todos = [
            { id: 1, text: 'Buy milk', completeAt: new Date() },
            { id: 2, text: 'Buy bread', completeAt: null },
            { id: 3, text: 'Buy butter', completeAt: new Date() },
        ]

export class TodosController {

    constructor(){}

    public getTodos = (req:Request, res:Response) => {

        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;

        if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});
        
        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json( todo )
            : res.status(404).json({error: `Todo with ${ id } not found`});
       
    }

    public createTodo = (req:Request, res:Response) => {

        const { text } = req.body;

        if( !text ) return res.status(400).json({error: 'Text property is required'})

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completeAt:null
        }

        todos.push(newTodo);

        res.json(newTodo)
    }


    public updateTodo = (req:Request, res: Response) => {

        const id = +req.params.id;

        if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});
        
        const todo = todos.find(todo => todo.id === id);

        if( !todo ) return res.status(404).json({ error: `Todo with id ${ id  } not found`})

        const {text,  completedAt } = req.body;

        todo.text = text || todo.text;;
        //! OJO, referencia

        // todos.forEach( (todo, index) => {
        //     if( todo.id === id){
        //         todos[index] = todo;
        //     }
        // });

        ( completedAt === 'null')
            ? todo.completeAt  = null
            : todo.completeAt = new Date( completedAt || todo.completeAt)

       

        res.json( todo );
    }


    public deleteTodo = (req:Request, res: Response) => {

        const id = +req.params.id;

        if( isNaN(id) ) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find(todo => todo.id === id);


        if( !todo ) return res.status(404).json({ error: `Todo with id ${ id  } not found`});


        if( !todo ) return  

        //eliminacin
/*         let newTodos = todos.filter( todo => todo.id != id );
        todos = [...newTodos] */
        todos.splice( todos.indexOf(todo), 1);

        res.json(todo);
    }
}