import {createPool} from 'mysql2'


const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '6862',
    database: 'notes_app'
}).promise()

interface INotes {
    id: number,
    title: string,
    contents: string,
    created_at: string
}


export const getNotes = async (id: number): Promise<undefined | INotes> => {
    try {
        const [result]: any  = await pool.query(`SELECT *FROM notes WHERE id = ?`, [id])
        return result[0];
        
    } catch (error) {
        console.log("Error:",error)
    }   
}

export const insertNotes = async(title: string, contents: string) => {
    try {
        const [result]: any = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents])
        return getNotes(result.insertId)

    } catch (error) {
        console.log(error)
    }
}

export const updateNotes = async(id: number, title: string = "", contents: string = "") => {
    try {
        await pool.query(`UPDATE notes SET title = ?, contents = ? WHERE id = ?`, [title, contents, id]
        );

        return getNotes(id);
        
    } catch (error) {
        throw error
    }
}

export const deleteNotes = async(id: number) => {
    try {
        const result = await pool.query(`DELETE FROM notes WHERE id = ?`, [id]
        );

        return result;
        
    } catch (error) {
        throw error
    }
}




