import express from 'express'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}));

import {deleteNotes, getNotes, insertNotes, updateNotes} from './databases'

app.get('/:id', async(req, res) => {
    try {
        const id: number = parseInt(req.params.id)

        const result = await getNotes(id)

        res.status(201).json(result)
        
    } catch (error) {
        console.log(error)
    }
    
})

app.post('/', async(req, res) => {
    try {
        const {title, contents} = req.body


        console.log(contents)

        const result = await insertNotes(title, contents)

        res.status(201).json(result)
        
    } catch (error) {
        console.log(error)
    }
    
})

app.patch('/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id)

        const {title, contents} = req.body

        const result = await updateNotes(id, title, contents)

        res.status(201).json(result)
        
    } catch (error) {
        console.log(error)
    }
    
})

app.delete('/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id)

        const result = await deleteNotes(id)

        res.status(201).json(result)
        
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(8080)