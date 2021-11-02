import { useEffect, useState } from 'react';
import './tasks.css';
import { Card, CardActions, CardContent, Button, Typography, Modal } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function Tasks(props) {
    const [tasks, setTasks] = useState(props.user.tasks);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [onEdit, setOnEdit] = useState(undefined);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        props.handleTasks(tasks);
    },[tasks])

    const createTask = (e) => {
        e.preventDefault();
        if (tasks){
            let newTask = {
                id: uuidv4(),
                title,
                description
            }
            setTasks([newTask,...tasks]);
        } else {
            setTasks([{
                id: uuidv4(),
                title,
                description
            }]);
        }
        setTitle("");
        setDescription("");
        handleClose();
    }

    const handleDelete = (id) => {
        let newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setOnEdit(task.id);
    }

    const editTask = (e, id) => {
        e.preventDefault();
        let newTasks = tasks;
        newTasks = newTasks.map(task => {
            if (task.id === id) {
                return task = {
                    id,
                    title,
                    description
                }
            } else {
                return task;
            }
        });
        setTasks(newTasks);
        setOnEdit(undefined);
        setTitle("");
        setDescription("");
    }

    return(
        <>
            <h1>Welcome {props.user.name}</h1>
            <Button className="addBtn" onClick={handleOpen}>Add Task</Button>
            <div className="container">
                {tasks ? tasks.map(task =>
                    <>
                    {onEdit === task.id ? (
                        <Card key={task.id}>
                            <form onSubmit={(e)=>editTask(e, task.id)}>
                                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter a title for the task..."/>
                                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter a description for the task..."/>
                                <Button type="submit">Save</Button>
                            </form>
                        </Card>
                    ):(
                    <Card key={task.id}>
                        <CardContent>
                            <Typography fontFamily="'Courier New', Courier, monospace" variant="h5">{task.title}</Typography>
                            <Typography fontFamily="'Courier New', Courier, monospace" variant="body2">{task.description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={()=>handleEdit(task)} size="small">Edit</Button>
                            <Button onClick={()=>handleDelete(task.id)} size="small">Delete</Button>
                        </CardActions>
                    </Card>
                    )}
                    </>
                ):(<></>)}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >   
                <form className="modalform" onSubmit={(e)=>createTask(e)}>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter a title for the task..."/>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter a description for the task..."/>
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </>
    )
}